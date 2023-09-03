import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';
import { User } from '@prisma/client';
import { GetAuthenticatedUser } from './user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async me(@GetAuthenticatedUser() user: User) {
    return new UserEntity(await this.usersService.findOne(user.id));
  }
}
