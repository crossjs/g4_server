// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportConfig from '../../../app/model/config';
import ExportDb from '../../../app/model/db';
import ExportUserLog from '../../../app/model/user-log';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Config: ReturnType<typeof ExportConfig>;
    Db: ReturnType<typeof ExportDb>;
    UserLog: ReturnType<typeof ExportUserLog>;
    User: ReturnType<typeof ExportUser>;
  }
}
