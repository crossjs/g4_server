import { Controller } from 'egg';

export default class UserController extends Controller {
  // 直接使用 code
  public async login() {
    const { ctx, app, config } = this;
    const { body } = ctx.request;

    const {
      code,
      nickName: nickname,
      avatarUrl: avatar,
      country,
      province,
      city,
      gender,
      language,
     } = body;

    const { openId, unionId } = await ctx.service.weixin.code2Session(code);

    const weixinData = {
      provider: 'weixin',
      providerId: openId,
      unionId,
      username: `${openId}@weixin`,
    };

    if (nickname || avatar) {
      Object.assign(weixinData, {
        nickname,
        avatar,
        country,
        province,
        city,
        gender,
        language,
      });
    }

    const _user = await ctx.service.user.findByProviderId(openId, 'weixin');

    const user = _user ?
      await ctx.service.user.update(_user.id, weixinData) :
      await ctx.service.user.create(weixinData);

    // 缓存 24 小时
    await app.redis.set(
      user.accessToken,
      JSON.stringify(user),
      // EX seconds -- Set the specified expire time, in seconds.
      // PX milliseconds -- Set the specified expire time, in milliseconds.
      'PX',
      config.accessTokenExpiresIn,
    );

    // 验证通过
    await this.findById(user.id);
    ctx.status = 201;
  }

  public async endow() {
    const { ctx } = this;
    const userId = await ctx.service.user.getCurrentUserId();
    ctx.body = await ctx.service.user.endow(userId, ctx.request.body);
  }

  /**
   * score, level, ...
   */
  public async pbl() {
    const { ctx } = this;
    const userId = await ctx.service.user.getCurrentUserId();
    const {
      score, level, combo, scores, played,
    } = await ctx.service.user.find(userId);
    const [sum = { balance: 0 }] = await ctx.service.balance.sumByUserId(userId);
    ctx.body = {
      score,
      level,
      combo,
      scores,
      played,
      balance: sum.balance,
    };
  }

  public async score() {
    const { ctx } = this;
    const score = ctx.helper.parseInt(ctx.request.body.score);
    const level = ctx.helper.parseInt(ctx.request.body.level);
    const combo = ctx.helper.parseInt(ctx.request.body.combo);
    const user = await ctx.service.user.findByAuthorization();
    const data = {
      $inc: {
        scores: score,
        played: 1,
      },
    };
    if (score > user.score) {
      Object.assign(data, { score });
    }
    if (level > user.level) {
      Object.assign(data, { level });
    }
    if (combo > user.combo) {
      Object.assign(data, { combo });
    }
    ctx.service.user.update(user.id, data);
    ctx.status = 204;
  }

  public async redpack() {
    const { ctx } = this;
    const amount = ctx.helper.parseFloat(ctx.request.body.amount);
    const userId = await ctx.service.user.getCurrentUserId();
    ctx.body = await ctx.service.balance.create({
      amount,
      userId,
    });
    ctx.status = 201;
  }

  public async whoami() {
    const { ctx } = this;
    const userId = await ctx.service.user.getCurrentUserId();
    await this.findById(userId);
  }

  // 详情
  public async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    await this.findById(id);
  }

  // 查询
  public async query() {
    const { ctx } = this;
    const { ids } = ctx.request.query;
    ctx.body = await ctx.service.user.query(ids.split(','), '-accessToken -password -salt');
  }

  private async findById(id: string) {
    const { ctx } = this;
    const user = await ctx.service.user.find(id, '-password -salt');
    if (!user) {
      ctx.status = 404;
      ctx.body = '用户不存在';
      return;
    }
    ctx.body = user;
  }
}
