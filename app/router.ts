import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, role } = app;

  const user = role.can('user');

  // 登录
  router.post('/api/user/login', controller.user.login);

  // 我是谁
  router.get('/api/user/whoami', user, controller.user.whoami);

  // 积分
  // 金币
  router.post('/api/user/endow', user, controller.user.endow);

  // 榜单
  router.post('/api/user/score', user, controller.user.score);
};
