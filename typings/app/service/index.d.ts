// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportConfig from '../../../app/service/Config';
import ExportUser from '../../../app/service/User';
import ExportUserLog from '../../../app/service/UserLog';
import ExportWeixin from '../../../app/service/Weixin';

declare module 'egg' {
  interface IService {
    config: ExportConfig;
    user: ExportUser;
    userLog: ExportUserLog;
    weixin: ExportWeixin;
  }
}
