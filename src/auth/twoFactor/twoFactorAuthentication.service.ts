import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { authenticator } from 'otplib';
import { Response } from 'express';
import { toFileStream } from 'qrcode'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly configServicce: ConfigService,
  ){}

  public async generateTwoFactorAuthenticationSecret(user: User){
    const secret = authenticator.generateSecret()

    const otpauthUrl = authenticator.keyuri(user.email,
      this.configServicce.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret)

    await this.userService.setTwoFactorAuthenticationSecret(secret, user.id);

    return {
      secret,
      otpauthUrl
    }
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string){
    return toFileStream(stream, otpauthUrl)
  }

  public async isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User){
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret
    })
  }
}
