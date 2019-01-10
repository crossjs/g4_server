import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  userrole: {
    enable: true,
    package: 'egg-userrole',
  },
};

export default plugin;
