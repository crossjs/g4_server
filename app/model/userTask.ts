import { Application } from "egg";

/**
 * 玩家任务记录
 */
export default (app: Application) => {
  const { mongoose, g4 } = app;
  const { Schema } = mongoose;

  const UserTaskSchema = new Schema({
    userId: {
      type: String,
      required: true,
    },
    taskId: {
      type: String,
      required: true,
    },
  }, {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  });

  return g4.model("UserTask", UserTaskSchema);
};
