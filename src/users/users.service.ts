import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  posts(username: string) {
    return this.prisma.user.findUnique({
      where: { username: username },
      select: {
        posts: {
          include: {
            author: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }
}
