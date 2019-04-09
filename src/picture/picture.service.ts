import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Picture } from './picture.entity';
import { IPicture } from './interfaces/picture.interface';
import { Observable } from 'rxjs';
import * as fetch from 'node-fetch';

@Injectable()
export class PictureService {

  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
  ) {}

  private async fetchItems()/*: Promise<[IPicture]>*/ {
    const raw = await fetch('https://api.flickr.com/services/feeds/photos_public.gne?tags=kitten&format=json&nojsoncallback=1');
    const { items } = await raw.json();
    return items;
  }

  async seed(): Promise<Picture> {
    const items = await this.fetchItems();
    const pictures = items.map(({
      author,
      author_id,
      date_taken,
      published,
      link,
      title,
      description,
      tags,
      media,
    }) => {
      const p = new Picture();
      p.author = author;
      p.authorId = author_id;
      p.dateTaken = new Date(date_taken);
      p.published = new Date(published);
      p.title = title;
      p.link = link;
      p.description = description;
      p.tags = tags.split(',');
      p.media = media;
      return p;
    });
    return await this.pictureRepository.save(pictures);
  }

  async find(params): Promise<Picture> {
    return await this.pictureRepository
      .createQueryBuilder('picture')
      .where('picture.id = :id', params)
      .getOne();
  }

}
