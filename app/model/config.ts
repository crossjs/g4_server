import { Application } from "egg";

export default (app: Application) => {
  const { mongoose, g4 } = app;
  const { Schema } = mongoose;

  const ConfigSchema = new Schema({
    // 名称
    name: {
      type: String,
      default: "",
    },
    // 广告单元 ID
    adUnitId: {
      type: String,
      default: "",
    },
    // 初始道具个数
    toolAmount: {
      type: Number,
      default: 0,
    },
    // 道具奖励领取方式：0 关闭 1 仅分享 2 仅视频 3 both
    toolReward: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 0,
    },
    // 金币奖励领取方式：0 关闭 1 仅分享 2 仅视频 3 both
    coinReward: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 0,
    },
    // 商店兑换物品：0 关闭 1 仅虚拟 2 仅实物 3 both
    shopStatus: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 0,
    },
    creator: {
      type: String,
      required: true,
    },
    updater: {
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

  ConfigSchema.index({ name: 1 }, { unique: true, sparse: true });

  return g4.model("Config", ConfigSchema);
};
