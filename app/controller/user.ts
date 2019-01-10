import { Controller } from 'egg';

export default class UserController extends Controller {
  // 直接使用 code
  public async login() {
    const { ctx, app, config } = this;
    const { body } = ctx.request;

    const { code, nickname, avatar } = body;

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

  public async score() {
    const { ctx } = this;
    const { score } = ctx.request.body;
    ctx.body = await ctx.service.score.create({
      score: ctx.helper.parseInt(score),
      userId: await ctx.service.user.getCurrentUserId(),
    });
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
