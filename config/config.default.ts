import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

// app special config scheme
export interface BizConfig {
  sourceUrl: string;
}

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  config.weixin = {
    origin: 'https://api.weixin.qq.com',
    // appId: 'wxfababee3255ad64b',
    // secretKey: 'eb73e7258167af8993a105152ea6eeef',
    // 借用 G2
    appId: 'wx2d01e63038198832',
    secretKey: '723e17827c72e86f22c1107f938068fb',
  };

  // 登录缓存 0.5 小时
  config.accessTokenExpiresIn = 1000 * 60 * 60 * 0.5;

  // 上传文件目录
  config.uploadFilePrefix = '/file/';
  // config.uploadFileDir = path.join(appInfo.baseDir, '../../box_server/file');
  config.uploadFileDir = path.join(appInfo.baseDir, 'file');

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534359818280_2334';

  // add your config here
  config.middleware = [ 'errorPage', 'errorHandler' ];

  config.proxy = true;

  config.static = {
    prefix: config.uploadFilePrefix,
    dir: config.uploadFileDir,
  };

  config.mongoose = {
    clients: {
      g4: {
        url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1:27017/g4',
        options: { poolSize: 20 },
      },
      // box: {
      //   url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1:27017/box',
      //   options: { poolSize: 20 },
      // },
      // log: {
      //   url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1:27017/logger',
      //   options: { poolSize: 20 },
      // },
    },
  };

  config.redis = {
    client: {
      port: 6384,                                    // Redis port
      host: process.env.REDIS_HOST || '127.0.0.1',   // Redis host
      password: process.env.REDIS_PASSWORD || '',
      db: 0,
    },
  };

  config.security = {
    csrf: false,
  };

  return config;
};
