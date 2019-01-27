const _status = [ 404, 403 ];

export default () => {
  return async function errorPage(ctx, next) {
    await next();
    const { message, body, status, acceptJSON } = ctx;
    if (!body && _status.indexOf(status) > -1) {
      ctx.body = acceptJSON ? {
        error: status === 404 ? "Not Found" : "Forbidden",
      } : message;
    }
  };
};
