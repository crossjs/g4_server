// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUserLog from '../../../app/model/user-log';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    UserLog: ReturnType<typeof ExportUserLog>;
    User: ReturnType<typeof ExportUser>;
  }
}
