import { Service } from 'egg';

interface BalanceData {
  [key: string]: any;
}

/**
 * Balance Service
 */
export default class Balance extends Service {
  // 不分页获取记录
  public async list() {
    const items = await this.ctx.model.Balance.find().exec();
    return {
      total: items.length,
      items,
    };
  }

  // 获取指定记录
  public async find(id: string) {
    return this.ctx.model.Balance.findById(id).exec();
  }

  // 创建记录
  public async create(balance: BalanceData) {
    return this.ctx.model.Balance.create(balance);
  }

  // 删除指定记录
  public async remove(id: string) {
    return this.ctx.model.Balance.findByIdAndRemove(id).exec();
  }

  // 求和
  public async sumByUserId(userId: string) {
    return this.ctx.model.Balance.aggregate()
    .match({
      userId,
    })
    .group({
      _id : null,
      balance : {
        $sum : '$amount',
      },
    });
  }
}
