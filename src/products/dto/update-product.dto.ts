import { IsNumber, IsString, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateProductDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  price: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  image: string;
}