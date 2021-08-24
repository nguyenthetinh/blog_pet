import { IsNumber, IsOptional, IsNotEmpty, IsString } from "class-validator";

export class UpdatePostDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;
}
