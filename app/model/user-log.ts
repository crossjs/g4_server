import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose, g4 } = app;
  const { Schema } = mongoose;

  const UserLogSchema = new Schema({
    userId: {
      type: String,
      required: true,
    },
    target: { // coins, points
      type: String,
      required: true,
    },
    amount: { // 正数为得到, 负数为消费
      type: Number,
      required: true,
    },
  }, {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  });

  return g4.model('UserLog', UserLogSchema);
};
