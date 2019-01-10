// export default (app: Application) => {
//   app.role.failureHandler = function(ctx, action) {
//     if (ctx.acceptJSON) {
//       // ctx.body = { target: loginURL, stat: 'deny' };
//     } else {
//       ctx.realStatus = 200;
//       // ctx.redirect(loginURL);
//     }
//   };
// };

export default {
  roleFailureHandler: null,
};
