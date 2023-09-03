import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id: id },
    });
  }

  //   create(data: CreatePostDto) {
  //     return this.prisma.post.create({
  //       data: data,
  //     });
  //   }
}
