import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule, rpc } from './app.module';

(async () => {
  const app = await NestFactory.createMicroservice(AppModule, rpc.grpc);
  await app.listenAsync();
})()
