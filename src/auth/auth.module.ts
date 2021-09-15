import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { TwoFactorAuthenticationService } from './twoFactor/twoFactorAuthentication.service';
import { TwoFactorAuthenticationController } from './twoFactor/twoFactorAuthentication.controller';
import { JwtTwoFactorStrategy } from './jwt-two-factor.strategy';
import { EmailConfirmationModule } from 'src/emailConfirmation/emailConfirmation.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    EmailConfirmationModule,
    JwtModule.register({}),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy, TwoFactorAuthenticationService, JwtTwoFactorStrategy],
  controllers: [AuthController, TwoFactorAuthenticationController],
  exports: [AuthService]
})
export class AuthModule {}
