import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './emailConfirmation.service';
import { EmailConfirmationController } from './emailConfirmation.controller';
import { EmailModule } from 'src/email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [EmailModule, JwtModule.register({}), UserModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
  exports: [EmailConfirmationService]
})
export class EmailConfirmationModule {}
