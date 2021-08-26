import { Controller, Post, UseGuards, UseInterceptors, Req, UploadedFile, Delete, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import JwtAuthenticationGuard from "src/auth/jwt-authentication.guard";
import { FileInterceptor } from '@nestjs/platform-express'
import { RequestWithUser } from "src/auth/requestWithUser.interface";
import { Express } from 'express'

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService
  ){}
  
  @Post('avatar')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatarUser(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File){
    return this.userService.addAvatar(request.user.id, file.buffer, file.originalname)
  }

  @Delete('avatar')
  @UseGuards(JwtAuthenticationGuard)
  async removeFile(@Req() request: RequestWithUser){
    return this.userService.removeAvatar(request.user.id)
  }
}