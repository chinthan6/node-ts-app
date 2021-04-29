import { IStrategy, NewStrategyParams } from "./strategy.interface";
import Strategy from "./strategy.model";

export class StrategyService {
  async addStrategyData(strategyData: NewStrategyParams) {
    try {
      strategyData.count += 10;
      const newStrategyData: IStrategy = {
        name: strategyData.name,
        types: [],
        count: strategyData.count,
      } as IStrategy;
      newStrategyData.types.push({
        field: "new Field",
        value: 2,
      });
      const strategyDoc = await Strategy.addStrategy(newStrategyData);
      return strategyDoc;
    } catch (err) {
      throw err;
    }
  }

  async getAllStrategiesByCount(count: number) {
    try {
      const matchQuery = {
        count: { $lt: 16 },
      };
      const strategies = await Strategy.getStrategies(matchQuery);
      return strategies;
    } catch (err) {
      throw err;
    }
  }

  async modifyNameById(
    strategyId: IStrategy["_id"],
    newName: IStrategy["name"]
  ) {
    try {
      const strategyData = await Strategy.updateNameById(strategyId, newName);
      return strategyData;
    } catch (err) {
      throw err;
    }
  }

  async modifyNameByIdAlternativeMethod(
    strategyId: IStrategy["_id"],
    newName: IStrategy["name"]
  ) {
    try {
      const matchQuery = {
        _id: strategyId,
      };
      const strategyData = await Strategy.getStrategyInfo(matchQuery);
      strategyData.name = newName;
      await strategyData.save();
      return strategyData;
    } catch (err) {
      throw err;
    }
  }

  async deleteStrategyById(strategyId: IStrategy["_id"]) {
    try {
      const matchQuery = {
        _id: strategyId,
      };
      const strategyData = await Strategy.getStrategyInfo(matchQuery);
      await strategyData.remove();
      //const strategyData = await Strategy.deleteStrategy(matchQuery);
      return strategyData;
    } catch (err) {
      throw err;
    }
  }
}
