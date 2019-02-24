
import { Context } from "egg";
import * as moment from "moment";

export default {
  schedule: {
    interval: "1h",
    type: "worker",
  },
  async task(ctx: Context) {
    const today = moment().startOf("day");

    // 清除以前的记录
    ctx.service.userTask.remove({
      createdAt: {
        $lt: today.toDate(),
      },
    });
  },
};
