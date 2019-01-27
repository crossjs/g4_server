import { Service } from "egg";

interface UserLogData {
  userId: string;
  target: string;
  amount: number;
}

/**
 * UserLog Service
 */
export default class UserLog extends Service {
  // 创建用户日志
  public async create(userLog: UserLogData) {
    return this.ctx.model.UserLog.create(userLog);
  }
}
