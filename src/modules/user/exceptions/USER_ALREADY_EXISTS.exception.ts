import { HttpException, HttpStatus } from '@nestjs/common';

export class THIS_EMAIL_IS_ALREADY_USED extends HttpException {
  constructor() {
    super('THIS_EMAIL_IS_ALREADY_USED', HttpStatus.BAD_REQUEST);
  }
}
