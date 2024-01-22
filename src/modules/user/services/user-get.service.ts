import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserGetService {
  constructor(private readonly userRepository: UserRepository) {}
  exec(id: string) {
    return 'This action fetch a User';
  }
}
