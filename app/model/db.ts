import { Application } from "egg";

export default (app: Application) => {
  const { mongoose, g4 } = app;
  const { Schema } = mongoose;
  const { Types } = Schema;

  const DbSchema = new Schema({
    userId: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    data: {
      type: Types.Mixed,
      required: true,
    },
  }, {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  });

  DbSchema.index({ userId: 1, key: 1 }, { unique: true });

  return g4.model("Db", DbSchema);
};
