import { Controller, Post, Body, HttpCode, UseGuards, Req, Res, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { RequestWithUser } from './requestWithUser.interface';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { UserService } from 'src/users/user.service';
import JwtRefreshGuard from './jwt-refresh.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userServie: UserService,
  ){}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }

  @Post('register')
  async register(@Body() registrationData: RegisterDto){
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const {user} = request;
    const accessTokenCookie = this.authService.getCookieWithJwtToken(user.id);
    const {
      cookie: refreshTokenCookie,
      token: refreshToken
    } = this.authService.getCookieWithJwtRefreshToken(user.id)
    await this.userServie.setCurrentRefreshToken(refreshToken, user.id)
    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    const data = {
      "message":"success",
      user
    }
    return data
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser){
    const accessTokenCookie = this.authService.getCookieWithJwtToken(request.user.id)
    request.res.setHeader('Set-Cookie', accessTokenCookie)
    return request.user
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.userServie.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return {
      message:"ok"
    }
  }
}
