// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportConfig from '../../../app/model/config';
import ExportUserLog from '../../../app/model/user-log';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Config: ReturnType<typeof ExportConfig>;
    UserLog: ReturnType<typeof ExportUserLog>;
    User: ReturnType<typeof ExportUser>;
  }
}
