import { HttpException, HttpStatus } from '@nestjs/common';

export class BAD_REQUEST_EXCEPTION extends HttpException {
  constructor() {
    super('BAD_REQUEST', HttpStatus.BAD_REQUEST);
  }
}
