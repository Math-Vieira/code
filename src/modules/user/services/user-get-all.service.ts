import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserGetAllService {
  constructor(private readonly userRepository: UserRepository) {}

  exec() {
    return 'This action fetch all User elements';
  }
}
