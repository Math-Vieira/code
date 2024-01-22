import { HttpException, HttpStatus } from '@nestjs/common';

export class USER_NOT_ACTIVE_EXCEPTION extends HttpException {
  constructor() {
    super('USER_NOT_ACTIVE', HttpStatus.BAD_REQUEST);
  }
}
