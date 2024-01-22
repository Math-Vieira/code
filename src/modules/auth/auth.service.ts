import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Request } from 'express';
import { BAD_REQUEST_EXCEPTION } from '@/shared/exceptions/BAD_REQUEST.exception';

@Injectable()
export class AuthService {
  public async createAccessToken(
    user_id: string,
    is_admin: boolean
  ): Promise<string> {
    return sign({ user_id, is_admin }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    });
  }

  public jwtExtractor(request: Request): string {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new BAD_REQUEST_EXCEPTION();
    }
    const token = authHeader.split(' ')[1];
    return token;
  }
}
