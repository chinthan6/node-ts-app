import { IStrategies, IStrategiesModel } from "./strategies.interface";
import { Schema, model } from "mongoose";

const strategiesSchema: Schema = new Schema(
  {
    companyName: String,
    theme: {
      type: String,
      ref: "Strategy",
    },
    author: [String],
    dataMeasure: String,
    targetYear: Date,
    targetValue: Number,
    policy: String,

    // any cannot be used as a type
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

strategiesSchema.virtual("themeInfo", {
  ref: "Strategy",
  localField: "theme",
  foreignField: "name",
  justOne: true,
});

strategiesSchema.statics = {
  addStrategies: async function (data) {
    console.log("dataaa", data);
    try {
      const newStrategies = new Strategies(data);
      await newStrategies.save();
      return newStrategies;
    } catch (error) {
      throw error;
    }
  },

  getStrategyInfo: async function (matchQuery = {}) {
    try {
      const strategies = await this.aggregate().match(matchQuery).lookup({
        from: "strategies",
        localField: "theme",
        foreignField: "name",
        as: "themeInfo",
      });
      //.unwind("themeInfo");
      return strategies;
    } catch (err) {
      throw err;
    }
  },
};

const Strategies: IStrategiesModel = model<IStrategies, IStrategiesModel>(
  "Company",
  strategiesSchema
);
export default Strategies;
