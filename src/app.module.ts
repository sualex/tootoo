import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PictureModule } from './picture/picture.module';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot(), PictureModule],
})
export class AppModule {
}
