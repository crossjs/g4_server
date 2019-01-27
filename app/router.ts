import { Application } from "egg";

export default (app: Application) => {
  const { controller, router, role } = app;

  const user = role.can("user");

  // 系统配置
  router.get("/api/config", controller.config.index);

  // 登录
  router.post("/api/user/login", controller.user.login);

  // 积分
  // 金币
  router.post("/api/user/award", user, controller.user.award);

  // 榜单
  router.get("/api/user/pbl", user, controller.user.getPbl);
  router.post("/api/user/pbl", user, controller.user.setPbl);
};
