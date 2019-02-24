import { Service } from "egg";
import * as moment from "moment";

/**
 * UserTask Service
 */
export default class UserTask extends Service {
  // 获取指定任务记录
  public async query(conditions: any) {
    return this.ctx.model.UserTask.find(conditions).exec();
  }

  // 获取指定用户任务
  public async find(conditions: any) {
    return this.ctx.model.UserTask.findOne(conditions).exec();
  }

  // 保存用户任务
  public async create({ taskId, userId }) {
    const { ctx } = this;

    const today = moment().startOf("day");
    const tomorrow = moment(today).endOf("day");
    const userTask = await this.find({
      taskId,
      userId,
      createdAt: {
        $gte: today.toDate(),
        $lt: tomorrow.toDate(),
      },
    });
    if (!userTask) {
      const { coins } = await ctx.service.task.find(taskId);
      // 不等
      ctx.service.user.award(userId, { coins });
      return this.ctx.model.UserTask.create({
        taskId,
        userId,
      });
    }
  }

  // 更新指定用户任务
  public async update(id: string, task: any) {
    return this.ctx.model.UserTask.findByIdAndUpdate(id, task, { new: true }).exec();
  }

  // 删除指定用户任务
  public async remove(conditions: any) {
    return this.ctx.model.UserTask.remove(conditions).exec();
  }
}
