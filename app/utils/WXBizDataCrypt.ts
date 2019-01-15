import * as crypto from 'crypto';

export default class WXBizDataCrypt {
  private appId: string;
  private sessionKey: string;

  constructor(appId: string, sessionKey: string) {
    this.appId = appId;
    this.sessionKey = sessionKey;

  }

  public decryptData(encryptedData: string, iv: string): any {
    let decoded: any;
    try {
       // 解密
      const decipher = crypto.createDecipheriv(
        'aes-128-cbc',
        new Buffer(this.sessionKey, 'base64'),
        new Buffer(iv, 'base64'),
      );
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      decoded = decipher.update(new Buffer(encryptedData, 'base64'), 'binary', 'utf8');
      decoded += decipher.final('utf8');
      decoded = JSON.parse(decoded);

      if (decoded.watermark.appid !== this.appId) {
        throw new Error('Illegal Buffer');
      }
    } catch (err) {
      throw new Error('Illegal Buffer');
    }
    return decoded;
  }
}
