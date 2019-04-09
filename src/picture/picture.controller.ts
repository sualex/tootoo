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

  constructor(private readonly pictureService: PictureService) {
  }

  async onModuleInit() {
    // this.pictureService = this.client.getService<PictureService>('PictureService');
    await this.pictureService.seed();
  }

  @GrpcMethod('PictureService')
  async findOne(data: PictureById) {

    const found = await this.pictureService.find(data);
    console.log(found);
    return found;

  }
}
