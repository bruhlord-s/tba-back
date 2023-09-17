import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  checkPermission(quizId: number, requestUserId: number) {
    if (quizId !== requestUserId) {
      throw new UnauthorizedException('You have no permission to do this');
    }
  }

  async findOne(quizId: number, requestUserId: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
    });

    this.checkPermission(quizId, requestUserId);

    return quiz;
  }

  async create(createQuizDto: CreateQuizDto, userId: number) {
    const quiz = await this.prisma.quiz.create({
      data: {
        ...createQuizDto,
        authorId: userId,
      },
      include: {
        author: true,
      },
    });

    return quiz;
  }

  async my(requestUserId: number) {
    return await this.prisma.user.findUnique({
      where: { id: requestUserId },
      select: {
        quizzes: {
          include: {
            author: true,
          },
        },
      },
    });
  }
}
