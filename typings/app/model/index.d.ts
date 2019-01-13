// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBalance from '../../../app/model/balance';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Balance: ReturnType<typeof ExportBalance>;
    User: ReturnType<typeof ExportUser>;
  }
}
