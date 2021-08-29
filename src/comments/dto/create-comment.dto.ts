import { IsString, IsNotEmpty, ValidateNested } from "class-validator";
import { ObjectWithIdDto } from "src/utils/types/objectWithId.dto";
import { Type } from "class-transformer";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @ValidateNested()
  @Type(() => ObjectWithIdDto)
  post: ObjectWithIdDto;
}
