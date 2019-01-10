import { Application as EggApplication } from 'egg';

declare module 'egg' {
  interface Application {
    role: {
      can: Function;
      use: Function;
    };
  }
}
