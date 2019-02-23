import { Controller } from "egg";

export default class DbController extends Controller {
  // 获取
  public async get() {
    const { ctx } = this;
    const { key } = ctx.query;
    const db = await ctx.service.db.find({ key, userId: ctx.user.id });
    if (db) {
      const { data } = db;
      ctx.body = data;
    } else {
      ctx.body = null;
    }
  }

  // 设置
  public async set() {
    const { ctx } = this;
    const { key } = ctx.query;
    const { data } = ctx.request.body;
    const db = await ctx.service.db.find({ key, userId: ctx.user.id });
    if (db) {
      ctx.service.db.update(db.id, data);
    } else {
      ctx.service.db.create({
        key,
        data,
        userId: ctx.user.id,
      });
    }
    ctx.body = data;
  }

  // 删除
  public async destroy() {
    const { ctx } = this;
    const { key } = ctx.query;
    ctx.body = await ctx.service.db.remove({ key, userId: ctx.user.id });
  }
}
