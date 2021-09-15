import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailConfirmationDto } from './create-emailConfirmation.dto';

export class UpdateEmailConfirmationDto extends PartialType(CreateEmailConfirmationDto) {
  
}
