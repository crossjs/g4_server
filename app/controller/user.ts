import { Controller } from "egg";
import WXBizDataCrypt from "../utils/WXBizDataCrypt";

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

    // 如果提供 code，那么就去微信服务端换 session
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
      provider = "weixin",
    } = userInfo;

    if (!openId) {
      throw new Error("需要 openId");
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
      "PX",
      config.accessTokenExpiresIn,
    );

    ctx.body = {
      ...JSON.parse(JSON.stringify(user)),
      expiresIn: config.accessTokenExpiresIn,
    };
    ctx.status = 201;
  }

  /**
   * coins, points, ...
   */
  public async award() {
    const { ctx } = this;
    let { coins, points } = ctx.request.body;

    if (coins) {
      coins = ctx.helper.parseInt(coins);
    }
    if (points) {
      points = ctx.helper.parseInt(points);
    }

    // 确保最新
    const user = await ctx.service.user.find(ctx.user.id);
    const payload = {};

    if (coins) {
      ctx.service.userLog.create({
        userId: user.id,
        target: "coins",
        amount: coins,
      });
      if (user.coins + coins >= 0) {
        Object.assign(payload, { coins });
      } else {
        throw new Error("金币余额不足");
      }
    }
    if (points) {
      ctx.service.userLog.create({
        userId: user.id,
        target: "points",
        amount: points,
      });
      if (user.points + points >= 0) {
        Object.assign(payload, { points });
      } else {
        throw new Error("积分余额不足");
      }
    }

    ctx.body = await ctx.service.user.award(user.id, payload);
  }

  /**
   * score, level, ...
   */
  public async getPbl() {
    const { ctx } = this;
    // 确保最新
    ctx.body = this.getPblDataFromRes(await ctx.service.user.find(
      ctx.user.id,
    ));
  }

  public async setPbl() {
    const { ctx } = this;
    const score = ctx.helper.parseInt(ctx.request.body.score);
    const level = ctx.helper.parseInt(ctx.request.body.level);
    const combo = ctx.helper.parseInt(ctx.request.body.combo);
    // 确保最新
    const user = await ctx.service.user.find(ctx.user.id);
    const payload = {
      $inc: {
        scores: score,
        played: 1,
      },
    };
    if (score > user.score) {
      Object.assign(payload, { score });
    }
    if (level > user.level) {
      Object.assign(payload, { level });
    }
    if (combo > user.combo) {
      Object.assign(payload, { combo });
    }
    ctx.body = this.getPblDataFromRes(await ctx.service.user.update(user.id, payload));
    ctx.status = 204;
  }

  private getPblDataFromRes(res: any) {
    const {
      score, level, combo, scores, played, coins, points,
    } = res;
    return {
      score, level, combo, scores, played, coins, points,
    };
  }
}
