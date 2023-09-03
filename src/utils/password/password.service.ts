import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class PasswordService {
  async hash(password: string) {
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(password, salt);

    return hash;
  }

  async compare(password: string, hash: string) {
    const result = await bcryptjs.compare(password, hash);

    return result;
  }
}
