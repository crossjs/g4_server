// !!! eggjs-userrole 写死了读取 role.js
module.exports = (app) => {
  app.role.use('user', async (ctx) => {
    const user = await ctx.service.user.findByAuthorization();
    ctx.user = user;
    return !!user;
  });
  app.role.failureHandler = function (ctx, action) {
    ctx.status = (action === 'user' || !ctx.user || !ctx.user._id) ? 401 : 403;
    ctx.body = {
      message: `role ${action} is required!`
    };
  };
};
