import { HttpException, HttpStatus } from '@nestjs/common';

export class CODE_EXPIRED_EXCEPTION extends HttpException {
  constructor() {
    super('CODE_EXPIRED', HttpStatus.BAD_REQUEST);
  }
}
