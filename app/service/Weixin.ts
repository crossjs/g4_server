import { Service } from 'egg';

/**
 * Wechat Service
 */
export default class Wechat extends Service {
  // 从 code 获取 openId、unionId
  public async code2Session(code: string) {
    const url = `{origin}/sns/jscode2session?grant_type=authorization_code&js_code=${code}&appid={appId}&secret={secretKey}`;

    const { errcode, openid, unionid } = await this.json(url);
    if (errcode) {
      // -1 系统繁忙，此时请开发者稍候再试
      // 40029 code 无效
      // 45011 频率限制，每个用户每分钟100次
      throw new Error(errcode === -1 ?
        '系统繁忙, 请稍候再试' : errcode === 40029 ?
        'code 无效' : errcode);
    }
    return {
      openId: openid,
      unionId: unionid,
    };
  }

  // 生成小程序码
  // public async getWXACode() {
  //   const { ctx, config } = this;
  //   const { urls: { token }, replace } = config.weixin;
  //   const { accessToken } = await this.getAccessToken();
  //   const url = `{origin}/wxa/getwxacode?access_token=${accessToken}`;
  //   // TODO 这里返回的是 rawData
  //   const data = await this.json(url, { method: 'POST' });
  //   return {
  //     data,
  //   };
  // }

  // 去微信服务端取 accessToken
  // public async getAccessToken() {
  //   const { app } = this;
  //   const url = `{origin}/cgi-bin/token?grant_type=client_credential&appid={appId}&secret={secretKey}`;
  //   const KEY = 'WEIXIN_ACCESS_TOKEN';
  //   const cachedAccessToken = await app.redis.get(KEY);

  //   if (cachedAccessToken) {
  //     return {
  //       accessToken: cachedAccessToken,
  //     };
  //   }

  //   const { errcode, access_token, expires_in } = await this.json(url);
  //   if (errcode) {
  //     // -1 系统繁忙，此时请开发者稍候再试
  //     // 0 请求成功
  //     // 40001 AppSecret 错误或者 AppSecret 不属于这个公众号，请开发者确认 AppSecret 的正确性
  //     // 40002 请确保 grant_type 字段值为 client_credential
  //     // 40164 调用接口的 IP 地址不在白名单中，请在接口 IP 白名单中进行设置。（小程序及小游戏调用不要求 IP 地址在白名单内。）
  //     throw new Error(errcode === -1 ? '系统繁忙, 请稍候再试' : errcode);
  //   }
  //   await app.redis.set(KEY, access_token, 'PX', 1000 * expires_in);
  //   return {
  //     accessToken: access_token,
  //   };
  // }

  private async json(url: string, options: any = {}): Promise<any> {
    const { data } = await this.ctx.curl(
      replaceUrl(url, this.config.weixin),
      {
        dataType: 'json',
        ...options,
      },
    );
    return data;
  }
}

function replaceUrl(url: string, obj: { [key: string]: string }) {
  return url.replace(/\{(.+?)\}/g, (_: string, key: string) => {
    return (key in obj) ? obj[key] : _;
  });
}
