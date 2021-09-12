import { Controller, UseInterceptors, ClassSerializerInterceptor, Post, UseGuards, Req, Res, Body, UnauthorizedException, HttpCode } from '@nestjs/common';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import JwtAuthenticationGuard from '../jwt-authentication.guard';
import { Response } from 'express';
import { RequestWithUser } from '../requestWithUser.interface';
import { TwoFactorAuthCode } from './dto/twoFactorAuthCode.dto';
import { UserService } from 'src/users/user.service';
import { AuthService } from '../auth.service';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthService: TwoFactorAuthenticationService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ){}

  @Post('generate')
  @UseGuards(JwtAuthenticationGuard)
  async register(@Res() response: Response, @Req() request: RequestWithUser){
    const { otpauthUrl } = await this.twoFactorAuthService.generateTwoFactorAuthenticationSecret(request.user)

    return this.twoFactorAuthService.pipeQrCodeStream(response, otpauthUrl)
  }

  @Post('turn-on')
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  async turnOnTwoFactorAuthentication(
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthCode,
    @Req() request: RequestWithUser
  ){
    const isCodeValid = await this.twoFactorAuthService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode, request.user
    )
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.userService.turnOnTwoFactorAuthentication(request.user.id)
    return {
      message:"success"
    }
  }

  @Post('auth')
  @UseGuards(JwtAuthenticationGuard)
  async authenticate(
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthCode,
    @Req() request: RequestWithUser
  ){
    const isCodeValid = await this.twoFactorAuthService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode, request.user
    )
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    const accessTokenCookie = this.authService.getCookieWithJwtToken(request.user.id, true)
    request.res.setHeader('Set-Cookie', [accessTokenCookie])
    return request.user
  }
}
