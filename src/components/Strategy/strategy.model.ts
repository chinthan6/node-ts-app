import { Schema, model, Types } from "mongoose";
import { IStrategy, IStrategyModel } from "./strategy.interface";
const strategySchema: Schema = new Schema(
  {
    name: String,
    types: [
      {
        field: String,
        value: Number,
      },
    ],
    count: {
      type: Number,
      default: 2,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

strategySchema.statics = {
  addStrategy: async function (strategyData) {
    try {
      const strategy = new Strategy(strategyData);
      strategy.count++;
      await strategy.save();
      return strategy;
    } catch (err) {
      throw err;
    }
  },

  getStrategies: async function (matchQuery = {}) {
    try {
      const strategies = await this.find(matchQuery);
      return strategies;
    } catch (err) {
      throw err;
    }
  },

  getStrategyInfo: async function (matchQuery = {}) {
    try {
      const strategies = await this.findOne(matchQuery);
      return strategies;
    } catch (err) {
      throw err;
    }
  },

  updateNameById: async function (strategyId, newName) {
    try {
      const updatedStrategy = await this.findByIdAndUpdate(
        strategyId,
        {
          $set: {
            name: newName,
          },
        },
        {
          new: true,
        }
      );
      return updatedStrategy;
    } catch (err) {
      throw err;
    }
  },

  deleteStrategy: async function (matchQuery = {}) {
    try {
      const deletedStrategy = await this.findOneAndDelete(matchQuery);
      return deletedStrategy;
    } catch (err) {
      throw err;
    }
  },
};

const Strategy: IStrategyModel = model<IStrategy, IStrategyModel>(
  "Strategy",
  strategySchema
);

export default Strategy;
