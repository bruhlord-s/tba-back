import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';

@Module({
  exports: [PasswordService],
})
export class PasswordModule {}
