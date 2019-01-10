// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportScore from '../../../app/service/Score';
import ExportUser from '../../../app/service/User';
import ExportWeixin from '../../../app/service/Weixin';

declare module 'egg' {
  interface IService {
    score: ExportScore;
    user: ExportUser;
    weixin: ExportWeixin;
  }
}
