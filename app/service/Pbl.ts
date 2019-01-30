import { Service } from "egg";

/**
 * Pbl Service
 */
export default class Pbl extends Service {
  // 获取排行
  public async list(filters?: any, select?: any) {
    return this.ctx.model.User.find(filters)
      .sort({ score: -1 }).select(select).exec();
  }
}
