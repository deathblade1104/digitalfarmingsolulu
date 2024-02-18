import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import Errors from '../../core/errors';
import utils from '../../core/utils';


export class RecommendDTO {

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Nitrogen content must be a non-negative number' })
  @Max(140, { message: "Nitrogen content can't be above 140" })
  N: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(5, { message: 'Phosphorus content must be above 5' })
  @Max(145, { message: "Phosphorus content can't be above 145" })
  P: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Potassium content must be a non-negative number' })
  @Max(205, { message: "Potassium content can't be above 205" })
  K: number;

  @IsNotEmpty()
  @IsNumber()
  temperature: number;

  @IsNotEmpty()
  @IsNumber()
  humidity: number;

  @IsNotEmpty()
  @IsNumber()
  ph: number;

  @IsNotEmpty()
  @IsNumber()
  rainfall: number;

  constructor(reqBody: Record<string,any>) {
    if (utils.isEmptyObject(reqBody)) {
      throw new Errors.MissingParameterError();
    }

    this.N = Number(reqBody.N);
    this.K = Number(reqBody.K);
    this.P = Number(reqBody.P);
    this.humidity = Number(reqBody.humidity);
    this.ph = Number(reqBody.ph);
    this.rainfall = Number(reqBody.rainfall);
    this.temperature = Number(reqBody.temperature);
  }
}
