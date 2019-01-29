// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportConfig from '../../../app/controller/config';
import ExportPbl from '../../../app/controller/pbl';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    config: ExportConfig;
    pbl: ExportPbl;
    user: ExportUser;
  }
}
