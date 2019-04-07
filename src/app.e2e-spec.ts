import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { rpc } from './app.module';
import * as execa from 'execa';
import { join } from 'path';
import { json } from './util/json';
import { IPicture } from './picture/interfaces/picture.interface';

describe('AppController (e2e)', () => {

  let app;
  // it is a nestjs grpc microservice endpoint, transport - protocol buffers
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    }).compile();
    app = moduleFixture.createNestMicroservice(rpc.grpc);
    await app.listenAsync();
  });
  // drop endpoint
  afterEach(async () => app && await app.close());

  it('grpcurl calls prototyped method and gets correct response',
    async () => {
      const protoPath = join(__dirname, './picture/picture.proto');
      const { stdout } = await execa.shell(
        `grpcurl -plaintext -format json -proto ${protoPath} -d '{"id": 1}' \
      127.0.0.1:5000 picture.PictureService/FindOne`,
      );
      const response = await json.parse(stdout) as IPicture;
      return expect(response)
        .toEqual(
          {
            id: 1,
            url: 'xxx',
          },
        );
    });

});
