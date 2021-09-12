import { IsString, IsNotEmpty } from "class-validator";

export class TwoFactorAuthCode {
  @IsString()
  @IsNotEmpty()
  twoFactorAuthenticationCode: string
}