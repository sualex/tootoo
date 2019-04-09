import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';

import * as execa from 'execa';
import { join } from 'path';
import { AppModule } from './app.module';
import { options as grpc } from './rpc.options';
import { json } from './json';
import { IPicture } from './picture/interfaces/picture.interface';

import { PictureService } from './picture/picture.service';
import { PictureController } from './picture/picture.controller';

const authDir = join(process.cwd(), './auth');

const getAppModule = async (): Promise<TestingModule> =>
  // it is a nestjs grpc microservice endpoint, transport - protocol buffers
  Test.createTestingModule({
    imports: [
      AppModule,
    ],
  }).compile();

async function prepareDataSet() {

}

describe('AppController (e2e)', () => {

  let appModule: TestingModule;
  let pictureService: PictureService;
  let pictureController: PictureController;
  let application: INestMicroservice;

  beforeAll(async () => {
    appModule = await getAppModule();
    pictureService = appModule.get<PictureService>(PictureService);
    pictureController = appModule.get<PictureController>(PictureController);

    // seed db with flickr kitten data
    await pictureService.seed();

    application = appModule.createNestMicroservice(grpc);
    await application.listenAsync();
  });

  afterEach(async () => application && await application.close());

  it('grpcurl calls prototyped method securely using client ssl certificate and gets correct response',
    async () => {
      const protoPath = join(__dirname, './picture/picture.proto');
      const { stdout } = await execa.shell(
        `grpcurl -cacert ${authDir}/server_cert.pem -cert ${authDir}/Alice_cert.pem -key ${authDir}/Alice_key.pem -format json \
        -proto ${protoPath} -d '{"id": 1}' localhost:5000 picture.PictureService/FindOne`,
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
