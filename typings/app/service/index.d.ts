// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBalance from '../../../../app/service/Balance';
import ExportUser from '../../../app/service/User';
import ExportWeixin from '../../../app/service/Weixin';

declare module 'egg' {
  interface IService {
    balance: ExportBalance;
    user: ExportUser;
    weixin: ExportWeixin;
  }
}
