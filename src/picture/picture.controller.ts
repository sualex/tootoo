import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { options as grpc } from '../grpc.options';
import { PictureById } from './interfaces/picture-by-id.interface';
import { IPicture } from './interfaces/picture.interface';

interface PictureService {
  findOne(data: { id: number }): Observable<any>;
}

@Controller()
export class PictureController implements OnModuleInit {
  @Client(grpc)
  private readonly client: ClientGrpc;
  private pictureService: PictureService;

  onModuleInit() {
    this.pictureService = this.client.getService<PictureService>('PictureService');
  }

  @GrpcMethod('PictureService')
  findOne(data: PictureById): IPicture {
    // console.log(data);
    const items: IPicture[] = [
      { id: 1, url: 'xxx' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
