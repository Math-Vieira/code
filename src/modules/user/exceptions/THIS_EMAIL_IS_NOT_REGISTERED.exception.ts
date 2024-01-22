import { HttpException, HttpStatus } from '@nestjs/common';

export class THIS_EMAIL_IS_NOT_REGISTERED_EXCEPTION extends HttpException {
  constructor() {
    super('THIS_EMAIL_IS_NOT_REGISTERED', HttpStatus.BAD_REQUEST);
  }
}
