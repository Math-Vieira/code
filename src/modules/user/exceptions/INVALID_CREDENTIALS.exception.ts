import { HttpException, HttpStatus } from '@nestjs/common';

export class INVALID_CREDENTIALS_EXCEPTION extends HttpException {
  constructor() {
    super('INVALID_CREDENTIALS', HttpStatus.BAD_REQUEST);
  }
}
