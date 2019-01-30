import { Controller } from "egg";

export default class PblController extends Controller {
  public async all() {
    const { ctx } = this;
    ctx.body = await ctx.service.pbl.list(
      {
        enabled: true,
        nickname: {
          $ne: null,
        },
       },
      ["openId", "avatar", "nickname", "score"],
    );
  }
}
