import { IsNotEmpty, IsString, Min, Max } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @Min(2)
  @Max(8)
  suffix: string;

  @IsNotEmpty()
  @IsString()
  userAddress: string;
}
