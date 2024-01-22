import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserEditService {
  constructor(private readonly userRepository: UserRepository) {}
  exec(id: string, updateUserDto: UpdateUserDto) {
    return 'This action edit a User';
  }
}
