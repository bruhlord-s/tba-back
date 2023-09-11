import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty({ required: false })
  username: string | null;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  email: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  name: string | null;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ required: false })
  password: string | null;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @ApiProperty({ required: false })
  bio: string | null;
}
