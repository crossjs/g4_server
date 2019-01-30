import { Controller } from "egg";

export default class PblController extends Controller {
  public async all() {
    const { ctx } = this;
    const items = await ctx.service.pbl.list(
      {
        enabled: true,
        nickname: {
          $ne: null,
        },
       },
      ["openId", "avatar", "nickname", "score"],
    );
    ctx.body = items.map(({ openId, avatarUrl, nickname, score }) => ({ openId, avatarUrl, nickname, score }));
  }
}
