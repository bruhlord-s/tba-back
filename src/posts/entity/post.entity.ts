import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/users/entity/user.entity';

export class PostEntity implements Post {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @Exclude()
  authorId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, type: UserEntity })
  author?: UserEntity;

  constructor({ author, ...data }: Partial<PostEntity>) {
    Object.assign(this, data);

    if (author) {
      this.author = new UserEntity(author);
    }
  }
}
