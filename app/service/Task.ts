import { Service } from "egg";

/**
 * Task Service
 */
export default class Task extends Service {
  // 不分页获取每日任务
  public async list() {
    return this.ctx.model.Task.find().sort({ order: 1 }).exec();
  }

  // 获取指定每日任务
  public async find(id: string) {
    return this.ctx.model.Task.findById(id).exec();
  }
}
