import { Body, Controller, UseGuards, Post} from '@nestjs/common';
import { EmailSchedulingService } from './emailScheduling.service';
import EmailScheduleDto from './dto/emailSchedule.dto';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';

@Controller('email-scheduling')
export class EmailSchedulingController {
  constructor(
    private readonly emailSchedulingService: EmailSchedulingService
  ) {}

  @Post('schedule')
  @UseGuards(JwtAuthenticationGuard)
  async scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
    this.emailSchedulingService.scheduleEmail(emailSchedule);
  }
}