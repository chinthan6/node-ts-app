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
import { StrategiesService } from "./strategies.service";
import { IStrategies, NewStrategiesParams } from "./strategies.interface";

@Tags("Strategies")
@Route("strategies")
export class StrategiesController extends Controller {
  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Post()
  async addStrategies(@Body() data: NewStrategiesParams) {
    console.log("initial", data);
    try {
      const strategyData = await new StrategiesService().addStrategiesData(
        data
      );
      this.setStatus(201);
      return new HttpSuccess(HttpResponseMessage.CREATED, strategyData);
    } catch (err) {
      throw err;
    }
  }

  @SuccessResponse(201, HttpResponseMessage.FETCHED)
  @Get("{comapnyId}")
  async deleteStrategyById(@Path() comapnyId: IStrategies["_id"]) {
    try {
      const strategyData = await new StrategiesService().getStrategyInfo(
        comapnyId
      );
      this.setStatus(201);
      return new HttpSuccess(HttpResponseMessage.FETCHED, strategyData);
    } catch (err) {
      throw err;
    }
  }
}
