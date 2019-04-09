import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PictureModule } from './picture/picture.module';

@Module({
  imports: [TypeOrmModule.forRoot(), PictureModule],
})
export class AppModule {
}
