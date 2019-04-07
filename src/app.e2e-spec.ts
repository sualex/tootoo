import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { rpc } from './app.module';

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

  afterEach(async () => app && await app.close());

  it('4 test', async () => {
    // await app.close();
    return expect(2 + 2).toBe(4);
  });

});
