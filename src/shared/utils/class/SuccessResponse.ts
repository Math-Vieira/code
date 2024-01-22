/* eslint-disable @typescript-eslint/no-explicit-any */
export class SuccessResponse {
  private readonly message: string | string[];
  private readonly statusCode: number;
  private readonly data: any;

  constructor(message: string, status: number, data?: any) {
    this.message = message;
    this.statusCode = status;
    this.data = data;
  }
}
