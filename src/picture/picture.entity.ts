import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  author: string;
  @Column({nullable: true})
  authorId: string;
  @Column({nullable: true})
  dateTaken: Date;
  @Column({nullable: true})
  published: Date;
  @Column('text', {nullable: true})
  link: string;
  @Column('text', {nullable: true})
  title: string;
  @Column('text', {nullable: true})
  description: string;
  @Column('simple-array', {nullable: true})
  tags: string[];
  @Column('simple-json', {nullable: true})
  media: {
    id: string,
    url: string
  };
}
