import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PublicFile } from "./publicFile.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import { v4 as uuid } from 'uuid'

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(PublicFile)
    private readonly fileRepository: Repository<PublicFile>,
    private readonly configService: ConfigService
  ){}

  async uploadPublicFile(dataBuffer: Buffer, filename: string){
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    })
      .promise();

    const newFile = this.fileRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location
    })

    await this.fileRepository.save(newFile);
    return newFile;
  }

  async removeFile(fileId: number){
    const file = await this.fileRepository.findOne({id: fileId});
    const s3 = new S3();
    await s3.deleteObject({
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Key: file.key,
    }).promise();
    await this.fileRepository.delete(fileId)
  }
}