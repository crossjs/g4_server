// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportConfig from '../../../app/service/Config';
import ExportPbl from '../../../app/service/Pbl';
import ExportUser from '../../../app/service/User';
import ExportUserLog from '../../../app/service/UserLog';
import ExportWeixin from '../../../app/service/Weixin';

declare module 'egg' {
  interface IService {
    config: ExportConfig;
    pbl: ExportPbl;
    user: ExportUser;
    userLog: ExportUserLog;
    weixin: ExportWeixin;
  }
}
