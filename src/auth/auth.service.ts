import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthEntity } from './entity/auth.entity';
import { RegisterDto } from './dto/register.dto';
import { PasswordService } from 'src/utils/password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await this.passwordService.hash(
      registerDto.password,
    );
    registerDto.password = hashedPassword;

    const user = await this.prisma.user.create({
      data: registerDto,
    });

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new UnauthorizedException(`Wrong email or password`);
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      throw new UnauthorizedException(`Wrong email or password`);
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
