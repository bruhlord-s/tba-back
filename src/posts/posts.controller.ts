import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { GetAuthenticatedUser } from 'src/users/user.decorator';
import { User } from '@prisma/client';
import { PostEntity } from './entity/post.entity';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity })
  async create(
    @Body() data: CreatePostDto,
    @GetAuthenticatedUser() user: User,
  ) {
    return new PostEntity(await this.postsService.create(user, data));
  }

  @Get()
  @ApiOkResponse({ type: PostEntity, isArray: true })
  async findAll() {
    const posts = await this.postsService.findAll();
    return posts.map((post) => new PostEntity(post));
  }

  @Get(':id')
  @ApiOkResponse({ type: PostEntity })
  async findOne(@Param('id') id: string) {
    return new PostEntity(await this.postsService.findOne(+id));
  }
}
