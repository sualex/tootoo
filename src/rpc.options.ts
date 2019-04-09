import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { readFileSync } from 'fs';
import { ServerCredentials } from 'grpc';

const authDir = join(process.cwd(), '/auth/');

export const options: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'picture',
    protoPath: join(__dirname, './picture/picture.proto'),
    credentials: ServerCredentials.createSsl(
      Buffer.from(
        readFileSync(join(authDir, './server_cert.pem'), 'utf8')),
      [
        {
          private_key: readFileSync(join(authDir, './server_key.pem')),
          cert_chain: readFileSync(join(authDir, './server_cert.pem')),
        },
      ],
      true,
    ),
  },
};
