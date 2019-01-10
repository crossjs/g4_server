import { Application } from 'egg';

/**
 * 分数
 */
export default (app: Application) => {
  const { mongoose, g4 } = app;
  const { Schema } = mongoose;

  const ScoreSchema = new Schema({
    userId: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  }, {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  });

  return g4.model('Score', ScoreSchema);
};
