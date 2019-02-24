// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportConfig from '../../../app/model/config';
import ExportDb from '../../../app/model/db';
import ExportTask from '../../../app/model/task';
import ExportUser from '../../../app/model/user';
import ExportUserLog from '../../../app/model/userLog';
import ExportUserTask from '../../../app/model/userTask';

declare module 'egg' {
  interface IModel {
    Config: ReturnType<typeof ExportConfig>;
    Db: ReturnType<typeof ExportDb>;
    Task: ReturnType<typeof ExportTask>;
    User: ReturnType<typeof ExportUser>;
    UserLog: ReturnType<typeof ExportUserLog>;
    UserTask: ReturnType<typeof ExportUserTask>;
  }
}
