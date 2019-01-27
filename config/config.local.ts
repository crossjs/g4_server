import { DefaultConfig } from "./config.default";

export default () => {
  const config: DefaultConfig = {};

  config.env = "local";

  // config.notfound = {
  //   pageUrl: '/404.html',
  // };

  config.onerror = {
    // all(_, ctx) {
    //   // 在此处定义针对所有响应类型的错误处理方法
    //   // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
    //   ctx.body = 'error';
    //   ctx.status = 500;
    // },
    html(err, ctx) {
      // html hander
      ctx.body = err;
      ctx.status = 500;
    },
    json(err, ctx) {
      // json hander
      ctx.body = { message: err };
      ctx.status = 500;
    },
  };

  return config;
};
