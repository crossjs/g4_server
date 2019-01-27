import { Service } from "egg";

/**
 * Config Service
 */
export default class Config extends Service {
  // 获取配置
  public async find() {
    return this.ctx.model.Config.findOne({ enabled: true }).exec();
  }
}
