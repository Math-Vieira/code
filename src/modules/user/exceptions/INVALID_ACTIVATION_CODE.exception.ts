import { HttpException, HttpStatus } from '@nestjs/common';

export class INVALID_ACTIVATION_CODE_EXCEPTION extends HttpException {
  constructor() {
    super('INVALID_ACTIVATION_CODE', HttpStatus.BAD_REQUEST);
  }
}
