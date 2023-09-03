import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';
import { User } from '@prisma/client';
import { GetAuthenticatedUser } from './user.decorator';
import { PostEntity } from 'src/posts/entity/post.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async me(@GetAuthenticatedUser() user: User) {
    return new UserEntity(await this.usersService.findOne(user.id));
  }

  @Get(':username/posts')
  @ApiOkResponse({ type: PostEntity, isArray: true })
  async posts(@Param('username') username: string) {
    const user = await this.usersService.posts(username);
    return user.posts.map((post) => new PostEntity(post));
  }
}
