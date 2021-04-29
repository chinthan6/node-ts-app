import { Document, Model } from "mongoose";

interface StrategyType {
  field: string;
  value: number;
}

interface IStrategySchema extends Document {
  _id: any;
  name: string;
  //createdBy: string;
  types: Array<StrategyType>;
  count: number;
}

//instance methods, virtuals
interface IStrategyBase extends IStrategySchema {}

// document with string reference
export interface IStrategy extends IStrategyBase {}

// document with reference populated
export interface IStrategyPopulated extends IStrategy {}

export interface IStrategyModel extends Model<IStrategy> {
  addStrategy(strategyData: IStrategy): Promise<IStrategy>;
  getStrategies(matchQuery: object): Promise<Array<IStrategy>>;
  getStrategyInfo(matchQuery: object): Promise<IStrategy>;
  updateNameById(
    strategyId: IStrategy["_id"],
    newName: IStrategy["name"]
  ): Promise<IStrategy>;
  deleteStrategy(matchQuery: object): Promise<IStrategy>;
}
export interface NewStrategyParams {
  name: IStrategy["name"];
  count?: IStrategy["count"];
}
