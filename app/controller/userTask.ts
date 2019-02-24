import { Controller } from "egg";
import * as moment from "moment";

export default class UserTaskController extends Controller {
  // 当天用户任务记录
  public async index() {
    const { ctx } = this;

    const today = moment().startOf("day");
    const tomorrow = moment(today).endOf("day");

    ctx.body = await ctx.service.userTask.query({
      userId: ctx.user.id,
      createdAt: {
        $gte: today.toDate(),
        $lt: tomorrow.toDate(),
      },
    });
  }

  // 插入用户任务记录
  public async create() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = await ctx.service.userTask.create({
      userId: ctx.user.id,
      taskId: id,
    });
  }
}
