import { Injectable } from '@nestjs/common';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(
    private readonly configService: ConfigService
  ){
    this.nodemailerTransport = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      }
    })
  }

  sendMail(options: Mail.Options){
    console.log("aa=", options)
    return this.nodemailerTransport.sendMail(options)
  }
}
