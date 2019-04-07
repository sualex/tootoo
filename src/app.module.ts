import { Module } from '@nestjs/common';
import { PictureModule } from './picture/picture.module';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const rpc = {
  grpc: {
    transport: Transport.GRPC,
    options: {
      package: 'picture',
      protoPath: join(__dirname, './picture/picture.proto'),
    },
  },
};

@Module({
  imports: [PictureModule],
})
export class AppModule {
}
