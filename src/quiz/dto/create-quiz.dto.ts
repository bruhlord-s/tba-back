import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  @ApiProperty()
  name: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  description?: string;
}
