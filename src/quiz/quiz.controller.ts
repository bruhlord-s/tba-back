import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuizEntity } from './entity/quiz.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetAuthenticatedUser } from 'src/users/user.decorator';
import { User } from '@prisma/client';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quiz')
@ApiTags('quiz')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post()
  @ApiCreatedResponse({ type: QuizEntity })
  async create(
    @GetAuthenticatedUser() user: User,
    @Body() createQuizDto: CreateQuizDto,
  ) {
    return await this.quizService.create(createQuizDto, user.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: QuizEntity })
  async findOne(
    @GetAuthenticatedUser() user: User,
    @Param('id') quizId: string,
  ) {
    return await this.quizService.findOne(+quizId, user.id);
  }

  @Get('my')
  @ApiOkResponse({ type: QuizEntity, isArray: true })
  async my(@GetAuthenticatedUser() user: User) {
    const data = await this.quizService.my(user.id);
    return data.quizzes.map((quiz) => new QuizEntity(quiz));
  }
}
