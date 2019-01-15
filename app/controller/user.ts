import { Controller } from 'egg';
import WXBizDataCrypt from '../utils/WXBizDataCrypt';

export default class UserController extends Controller {
  // 直接使用 code
  public async login() {
    const { ctx, app, config } = this;

    const {
      code,
      encryptedData,
      iv,
      userInfo = {},
    } = ctx.request.body;

    // 可能登录还未失效
    if (code) {
      const session = await ctx.service.weixin.code2Session(code);
      const { sessionKey, ...restFromSession } = session;
      Object.assign(userInfo, restFromSession);

      if (!restFromSession.unionId) {
        // 没取到 unionId，则从数据解密
        if (encryptedData && iv) {
          const decryptedData = new WXBizDataCrypt(config.weixin.appId, sessionKey).decryptData(encryptedData, iv);
          if (decryptedData) {
            Object.assign(userInfo, decryptedData);
          }
        }
      }
    }

    const {
      nickName: nickname,
      avatarUrl: avatar,
      country,
      province,
      city,
      gender,
      language,
      openId,
      unionId,
      provider = 'weixin',
    } = userInfo;

    if (!openId) {
      throw new Error('需要 openId');
    }

    const userData = {
      provider,
      openId,
      username: `${openId}@${provider}`,
    };

    if (unionId) {
      Object.assign(userData, {
        unionId,
      });
    }

    if (nickname) {
      Object.assign(userData, {
        nickname,
        avatar,
        country,
        province,
        city,
        gender,
        language,
      });
    }

    const _user = await ctx.service.user.findByOpenId(openId, provider);

    const user = _user ?
      await ctx.service.user.update(_user.id, userData) :
      await ctx.service.user.create(userData);

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
