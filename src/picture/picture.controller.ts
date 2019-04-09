import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { options as grpc } from '../rpc.options';
import { PictureById } from './interfaces/picture-by-id.interface';
import { IPicture } from './interfaces/picture.interface';
import { PictureService } from './picture.service';

// interface PictureService {
//   findOne(data: { id: number }): Observable<any>;
// }

@Controller()
export class PictureController implements OnModuleInit {

  constructor(
    private readonly pictureService: PictureService,
  ) {}

  async onModuleInit() {
    // this.pictureService = this.client.getService<PictureService>('PictureService');
  }

  @GrpcMethod('PictureService', 'Find')
  async find(data: PictureById) {

    console.log(data);

    const found = await this.pictureService.find(data);
    return found;
  }
}
