import { Types } from "mongoose";
import Strategies from "./startegies.model";
import { IStrategies, NewStrategiesParams } from "./strategies.interface";

export class StrategiesService {
  async addStrategiesData(data: NewStrategiesParams) {
    try {
      const strategiesResult: IStrategies = {
        theme: data.theme,
        author: data.author,
        dataMeasure: data.dataMeasure,
        targetYear: data.targetYear,
        targetValue: data.targetValue,
        policy: data.policy,
      } as IStrategies;
      const strategiesData = await Strategies.addStrategies(strategiesResult);
      return strategiesData;
    } catch (error) {
      throw error;
    }
  }

  async getStrategyInfo(companyId: IStrategies["_id"]) {
    try {
      const matchQuery = {
        _id: new Types.ObjectId(companyId),
      };
      const strategies = await Strategies.getStrategyInfo(matchQuery);
      return strategies;
    } catch (err) {
      throw err;
    }
  }
}
