import { HttpException, HttpStatus } from '@nestjs/common';

export class THIS_USER_IS_ALREADY_ACTIVE_EXCEPTION extends HttpException {
  constructor() {
    super('THIS_USER_IS_ALREADY_ACTIVE', HttpStatus.BAD_REQUEST);
  }
}
