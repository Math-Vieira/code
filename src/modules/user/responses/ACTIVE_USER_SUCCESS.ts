import { SuccessResponse } from '@/shared/utils/class/SuccessResponse';
import { HttpStatus } from '@nestjs/common';

export class ACTIVE_USER_SUCCESS extends SuccessResponse {
  constructor() {
    super('ACTIVE_USER_SUCCESS', HttpStatus.OK);
  }
}
