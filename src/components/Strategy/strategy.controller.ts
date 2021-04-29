import {
  Controller,
  Post,
  Route,
  Request,
  SuccessResponse,
  Tags,
  Get,
  Path,
  Query,
  Body,
  Put,
  Delete,
} from "tsoa";
import { HttpResponseMessage } from "../../common/enums/httpResponseMessage.enum";
import { HttpSuccess } from "../../common/helpers/HttpResponse";
import { IStrategy, NewStrategyParams } from "./strategy.interface";
import { StrategyService } from "./strategy.service";

@Tags("Strat")
@Route("strat")
export class StrategyController extends Controller {
  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Post()
  async addStrategy(@Body() newStrategyData: NewStrategyParams) {
    try {
      const strategyData = await new StrategyService().addStrategyData(
        newStrategyData
      );
      this.setStatus(201);
      return new HttpSuccess(HttpResponseMessage.CREATED, strategyData);
    } catch (err) {
      throw err;
    }
  }

  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  @Get()
  async getStrategiesByCount(@Query() count: IStrategy["count"]) {
    try {
      const strategies = await new StrategyService().getAllStrategiesByCount(
        count
      );
      this.setStatus(200);
      return new HttpSuccess(HttpResponseMessage.FETCHED, strategies);
    } catch (err) {
      throw err;
    }
  }

  @SuccessResponse(201, HttpResponseMessage.UPDATED)
  @Put("{strategyId}")
  async modifyStrategy(
    @Path() strategyId: IStrategy["_id"],
    @Body()
    modifiedData: {
      newName: IStrategy["name"];
    }
  ) {
    try {
      // const strategyData = await new StrategyService().modifyNameById(
      //   strategyId,
      //   modifiedData.newName
      // );
      const strategyData = await new StrategyService().modifyNameByIdAlternativeMethod(
        strategyId,
        modifiedData.newName
      );
      this.setStatus(201);
      return new HttpSuccess(HttpResponseMessage.UPDATED, strategyData);
    } catch (err) {
      throw err;
    }
  }

  @SuccessResponse(201, HttpResponseMessage.DELETED)
  @Delete("{strategyId}")
  async deleteStrategyById(@Path() strategyId: IStrategy["_id"]) {
    try {
      const strategyData = await new StrategyService().deleteStrategyById(
        strategyId
      );
      this.setStatus(201);
      return new HttpSuccess(HttpResponseMessage.DELETED, strategyData);
    } catch (err) {
      throw err;
    }
  }
}
