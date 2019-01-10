// !!! eggjs-userrole 写死了读取 role.js
module.exports = (app) => {
  app.role.use('user', async (ctx) => {
    return !!await ctx.service.user.findByAuthorization();
  });
  app.role.failureHandler = function (ctx, action) {
    ctx.status = (action === 'user' || !ctx.user || !ctx.user._id) ? 401 : 403;
    ctx.body = `role ${action} is required!`;
  };
};
