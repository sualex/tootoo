import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { options as grpc } from './rpc.options'

(async () => {
  const app = await NestFactory.createMicroservice(AppModule, grpc);
  await app.listenAsync();
})()
