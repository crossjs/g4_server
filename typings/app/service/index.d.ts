// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUser from '../../../app/service/User';
import ExportWeixin from '../../../app/service/Weixin';

declare module 'egg' {
  interface IService {
    user: ExportUser;
    weixin: ExportWeixin;
  }
}
