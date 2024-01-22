import { SuccessResponse } from '@/shared/utils/class/SuccessResponse';
import { HttpStatus } from '@nestjs/common';

export class SIGN_IN_SUCCESS extends SuccessResponse {
  constructor(jwt: string) {
    super('SIGN_IN_SUCCESS', HttpStatus.OK, { jwt });
  }
}
