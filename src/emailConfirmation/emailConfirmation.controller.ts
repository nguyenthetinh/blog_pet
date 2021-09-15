import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EmailConfirmationService } from './emailConfirmation.service';
import ConfirmEmailDto from './dto/verifyEmail.dto';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { RequestWithUser } from 'src/auth/requestWithUser.interface';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService
  ) {}

  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto){
    const email =  await this.emailConfirmationService.decodeConfirmationToken(confirmationData.token)
    await this.emailConfirmationService.confirmEmail(email)
  }

  @Post('resend-confirmation-link')
  @UseGuards(JwtAuthenticationGuard)
  async resendConfirmationLink(@Req() request: RequestWithUser) {
    await this.emailConfirmationService.resendConfirmationLink(request.user.id);
  }
}
