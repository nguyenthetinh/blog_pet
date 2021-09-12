import { Injectable, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, Connection } from 'typeorm';
import { FileService } from 'src/files/files.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly fileService: FileService,
    private readonly connection: Connection,
  ){}

  async getById(id: number) {
    const user = await this.userRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string){
    const avatar = await this.fileService.uploadPublicFile(imageBuffer, filename);
    const user = await this.getById(userId)
    await this.userRepository.update(userId, {
      ...user,
      avatar
    })
    return avatar
  }

  async removeAvatar(userId: number){
    const queryRunner = this.connection.createQueryRunner()

    const user = await this.getById(userId)
    const fileId = user.avatar?.id
    if (fileId) {
      await queryRunner.connect()
      await queryRunner.startTransaction()
      try {
        await queryRunner.manager.update(User, userId, {
          ...user,
          avatar: null
        })
        await this.fileService.deletePublicFileWithQueryRunner(fileId, queryRunner);
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException();
      } finally {
        await queryRunner.release();
      }
    }
  }

  async getByEmail(email: string){
    const user = await this.userRepository.findOne({email});
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number){
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10)
    await this.userRepository.update(userId, {
      currentHashedRefreshToken
    })
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number){
    const user = await this.getById(userId)

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken
    )

    if (isRefreshTokenMatching) {
      return user
    }
  }

  async removeRefreshToken(userId: number) {
    return this.userRepository.update(userId, {
      currentHashedRefreshToken: null
    });
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number){
    return this.userRepository.update(userId,{
      twoFactorAuthenticationSecret: secret
    })
  }

  async turnOnTwoFactorAuthentication(userId: number){
    return this.userRepository.update(userId, {
      isTwoFactorAuthenticationEnabled: true,
    })
  }
}
