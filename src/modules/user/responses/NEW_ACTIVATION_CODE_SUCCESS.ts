import { SuccessResponse } from '@/shared/utils/class/SuccessResponse';
import { HttpStatus } from '@nestjs/common';

export class NEW_ACTIVATION_CODE_SUCCESS extends SuccessResponse {
  constructor() {
    super('NEW_ACTIVATION_CODE_SUCCESS', HttpStatus.OK);
  }
}
