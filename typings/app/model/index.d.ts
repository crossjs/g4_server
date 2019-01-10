// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportScore from '../../../app/model/score';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Score: ReturnType<typeof ExportScore>;
    User: ReturnType<typeof ExportUser>;
  }
}
