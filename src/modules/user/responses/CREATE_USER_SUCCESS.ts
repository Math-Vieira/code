import { SuccessResponse } from '@/shared/utils/class/SuccessResponse';
import { HttpStatus } from '@nestjs/common';

export class CREATE_USER_SUCCESS extends SuccessResponse {
  constructor() {
    super('CREATE_USER_SUCCESS', HttpStatus.CREATED);
  }
}
