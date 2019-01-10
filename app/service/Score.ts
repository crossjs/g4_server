import { Service } from 'egg';

interface ScoreData {
  [key: string]: any;
}

/**
 * Score Service
 */
export default class Score extends Service {
  // 创建记录
  public async create(score: ScoreData) {
    const { model } = this.ctx;
    return model.Score.create(score);
  }
}
