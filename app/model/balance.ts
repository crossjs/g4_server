import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose, g4 } = app;
  const { Schema } = mongoose;

  const BalanceSchema = new Schema({
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  }, {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  });

  return g4.model('Balance', BalanceSchema);
};
