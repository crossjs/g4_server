import { Controller } from "egg";

export default class ConfigController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.config.find();
  }
}
