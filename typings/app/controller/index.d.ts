// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportConfig from '../../../app/controller/config';
import ExportDb from '../../../app/controller/db';
import ExportPbl from '../../../app/controller/pbl';
import ExportTask from '../../../app/controller/task';
import ExportUser from '../../../app/controller/user';
import ExportUserTask from '../../../app/controller/userTask';

declare module 'egg' {
  interface IController {
    config: ExportConfig;
    db: ExportDb;
    pbl: ExportPbl;
    task: ExportTask;
    user: ExportUser;
    userTask: ExportUserTask;
  }
}
