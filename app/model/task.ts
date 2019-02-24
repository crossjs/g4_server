import { Application } from "egg";

/**
 * 任务
 */
export default (app: Application) => {
  const { mongoose, g4 } = app;
  const { Schema } = mongoose;

  const TaskSchema = new Schema({
    action: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      default: 1,
    },
    coins: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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

  TaskSchema.index({ name: 1 }, { unique: true });

  return g4.model("Task", TaskSchema);
};
