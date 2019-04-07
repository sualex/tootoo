import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const options: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'picture',
    protoPath: join(__dirname, './picture/picture.proto'),
  },
};
