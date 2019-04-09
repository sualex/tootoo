import { Module } from '@nestjs/common';
import { PictureController } from './picture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './picture.entity';
import { PictureService } from './picture.service';

@Module({
  imports: [TypeOrmModule.forFeature([Picture])],
  providers: [PictureService],
  controllers: [PictureController],
})
export class PictureModule {}
