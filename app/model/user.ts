import { Application } from 'egg';
import * as utility from 'utility';

export default (app: Application) => {
  const { mongoose, g4 } = app;
  const { Schema } = mongoose;

  const UserSchema = new Schema({
    provider: {
      type: String,
    },
    providerId: {
      type: String,
    },
    unionId: {
      type: String,
    },
    username: {
      type: String,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
    },
    salt: {
      type: String,
    },
    // 游戏化信息
    nickname: {
      type: String,
    },
    avatar: {
      type: String,
    },
    coins: {
      type: Number,
      default: 0,
    },
    point: {
      type: Number,
      default: 0,
    },
    // 联系信息
    mobile: {
      type: Number,
    },
    email: {
      type: String,
    },
    // 登录信息
    // TODO 增加有效期
    accessToken: {
      type: String,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  }, {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  });

  UserSchema.index({ username: 1 }, { unique: true, sparse: true });
  UserSchema.index({ email: 1 }, { unique: true, sparse: true });
  UserSchema.index({ mobile: 1 }, { unique: true, sparse: true });
  UserSchema.index({ providerId: 1, provider: 1 }, { unique: true, sparse: true });
  UserSchema.index({ accessToken: 1 });

  UserSchema.virtual('avatarUrl').get(function () {
    const { avatar, email } = this;
    if (avatar) {
      if (/^http/.test(avatar)) {
        return avatar;
      }
      return `${app.config.uploadFilePrefix}${this.avatar}`;
    }

    if (email) {
      // 使用 gravatar
      return `https://gravatar.com/avatar/${utility.md5(email.toLowerCase())}?size=96`;
    }

    return '';
  });

  return g4.model('User', UserSchema);
};
