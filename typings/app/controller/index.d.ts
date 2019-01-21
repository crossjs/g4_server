// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportConfig from '../../../app/controller/config';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    config: ExportConfig;
    user: ExportUser;
  }
}
