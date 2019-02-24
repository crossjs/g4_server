import { Controller } from "egg";

export default class TaskController extends Controller {
  // 集合
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.task.list();
  }
}
