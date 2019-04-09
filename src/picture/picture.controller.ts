import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { options as grpc } from '../rpc.options';
import { PictureQuery } from './interfaces/picture.query.interface';
import { IPicture } from './interfaces/picture.interface';
import { PictureService } from './picture.service';
import { from } from 'rxjs';

import { Subject } from 'rxjs';

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
    // seed db with flickr kitten data
    await this.pictureService.seed();
  }

  @GrpcMethod('PictureService', 'Find')
  async find(query: PictureQuery): Promise<Observable<any>> {
    const found = await this.pictureService.find(query);
    return from(found);
  }
}
