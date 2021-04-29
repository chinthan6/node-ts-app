import { Document, Model } from "mongoose";

interface IStartegiesSchema extends Document {
  _id: any;
  theme: string;
  author: Array<string>;
  dataMeasure: string;
  targetYear: Date;
  targetValue: number;
  policy: string;
}
//instance methods, virtuals
interface IStrategiesBase extends IStartegiesSchema {}

// document with string reference
export interface IStrategies extends IStrategiesBase {}

// document with reference populated
export interface IStrategiesiesPopulated extends IStrategies {}

export interface IStrategiesModel extends Model<IStrategies> {
  addStrategies(data: IStrategies): Promise<IStrategies>;
  getStrategyInfo(matchQuery: object): Promise<IStrategies>;
}

export interface NewStrategiesParams {
  theme: IStrategies["theme"];
  author: IStrategies["author"];
  dataMeasure: IStrategies["dataMeasure"];
  targetYear: IStrategies["targetYear"];
  targetValue: IStrategies["targetValue"];
  policy: IStrategies["policy"];
}
