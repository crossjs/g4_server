import { Application } from "egg";

export default (app: Application) => {
  const { controller, router, role } = app;

  const user = role.can("user");

  // 系统配置
  router.get("/api/config", controller.config.index);

  // 每日任务
  router.get("/api/tasks", controller.task.index);

  // 世界排行
  router.get("/api/pbl", controller.pbl.index);

  // 登录
  router.post("/api/user/login", controller.user.login);

  // 数据存取
  router.get("/api/db", user, controller.db.get);
  router.post("/api/db", user, controller.db.set);
  router.del("/api/db", user, controller.db.destroy);

  // 积分、金币
  router.post("/api/user/award", user, controller.user.award);

  // 个人游戏数据
  router.get("/api/user/pbl", user, controller.user.getPbl);
  router.post("/api/user/pbl", user, controller.user.setPbl);

  // 用户任务记录
  router.get("/api/user/tasks", user, controller.userTask.index);
  router.post("/api/user/tasks/:id", user, controller.userTask.create);
};
