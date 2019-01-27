import { Service } from "egg";

interface UserData {
  [key: string]: any;
}

/**
 * User Service
 */
export default class User extends Service {
  // 获取指定用户
  public async find(id: string, select?: any) {
    return this.ctx.model.User.findById(id).select(select).exec();
  }

  // 获取指定用户
  public async query(ids: string[], select?: any) {
    return {
      items: await this.ctx.model.User.find({
        _id: {
          $in: ids.map(this.app.mongoose.Types.ObjectId),
        },
      }).select(select).exec(),
    };
  }

  // 获取指定用户
  public async queryByOpenIds(openIds: string[]) {
    const items = await this.ctx.model.User.find({
      openId: {
        $in: openIds,
      },
    }).exec();
    return {
      items,
    };
  }

  // 创建用户
  public async create(user: UserData) {
    const { helper, model } = this.ctx;
    if (user.password) {
      user.salt = helper.salt();
      user.password = helper.hash(user.password, user.salt);
    }
    user.accessToken = helper.salt();
    return model.User.create(user);
  }

  // 更新指定用户
  public async update(id: string, user: UserData) {
    const { helper, model } = this.ctx;
    if (user.password) {
      user.salt = helper.salt();
      user.password = helper.hash(user.password, user.salt);
    }
    user.accessToken = helper.salt();
    return model.User.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  // 更新指定用户的积分、金币等等
  public async award(id: string, $inc: UserData) {
    return this.ctx.model.User.findByIdAndUpdate(id, { $inc }, { new: true }).exec();
  }

  // 删除指定用户
  public async remove(id: string) {
    return this.ctx.model.User.findByIdAndRemove(id).exec();
  }

  // 获取指定用户
  public async findByOpenId(openId: string, provider = "weixin") {
    const query = { openId, provider };
    return this.ctx.model.User.findOne(query).exec();
  }

  // 获取指定用户
  public async findByAccessToken(accessToken: string) {
    const query = { accessToken };
    return this.ctx.model.User.findOne(query).exec();
  }

  // 根据鉴权头获取
  public async findByAuthorization() {
    const { ctx, app } = this;
    const token = ctx.get("Authorization");
    if (token) {
        const [type, accessToken] = token.split(" ");
        if (type === "Bearer") {
          const _accessToken = accessToken.replace(/^"|"$/g, "");

          // 去缓存找
          const cachedUser = await app.redis.get(_accessToken);
          if (cachedUser) {
            return JSON.parse(cachedUser);
          }

          // 去数据库找
          const existsUser = await this.findByAccessToken(_accessToken);

          // 用户不存在
          if (!existsUser) {
            return null;
          }

          // 用户未启用
          if (!existsUser.enabled) {
            return null;
          }

          return existsUser;
        }
    }
    return null;
  }
}
