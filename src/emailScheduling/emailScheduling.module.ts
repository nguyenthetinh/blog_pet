import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { EmailSchedulingService } from './emailScheduling.service';
import { EmailSchedulingController } from './emailScheduling.controller';

@Module({
  imports: [EmailModule],
  controllers: [EmailSchedulingController],
  providers: [EmailSchedulingService]
})
export class EmailSchedulingModule {}
