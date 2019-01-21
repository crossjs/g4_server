import { Controller } from 'egg';

export default class ConfigController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = {
      // 是否启用广告（或转发……）激励
      ad: true,
      // 广告单元 ID
      adUnitId: '',
    };
  }
}
