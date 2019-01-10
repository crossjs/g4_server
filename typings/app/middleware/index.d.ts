// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportErrorHandler from '../../../app/middleware/error_handler';
import ExportErrorPage from '../../../app/middleware/error_page';

declare module 'egg' {
  interface IMiddleware {
    errorHandler: typeof ExportErrorHandler;
    errorPage: typeof ExportErrorPage;
  }
}
