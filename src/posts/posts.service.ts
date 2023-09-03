import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(user: User, createPostDto: CreatePostDto) {
    const data = {
      ...createPostDto,
      authorId: user.id,
    };

    return this.prisma.post.create({
      data: data,
      include: {
        author: true,
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id: id },
      include: {
        author: true,
      },
    });
  }
}
