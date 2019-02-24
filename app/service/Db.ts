import { Service } from "egg";

/**
 * Db Service
 */
export default class Db extends Service {
  // 获取指定配置
  public async find(conditions: any) {
    return this.ctx.model.Db.findOne(conditions).exec();
  }

  // 创建配置
  public async create(data: any) {
    return this.ctx.model.Db.create(data);
  }

  // 更新配置
  public async update(id: string, data: any) {
    return this.ctx.model.Db.findByIdAndUpdate(id, { data }, { new: true }).exec();
  }

  // 删除配置
  public async remove(conditions: any) {
    return this.ctx.model.Db.findOneAndRemove(conditions).exec();
  }
}
