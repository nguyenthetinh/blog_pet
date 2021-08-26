import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PublicFile } from "./publicFile.entity";
import { ConfigModule } from "@nestjs/config";
import { FileService } from "./files.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicFile]),
    ConfigModule,
  ],
  providers: [FileService],
  exports: [FileService]
})

export class FilesModule {}