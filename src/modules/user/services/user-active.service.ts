import { ActiveUserDto } from '../dto/active-user.dto';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { THIS_EMAIL_IS_NOT_REGISTERED_EXCEPTION } from '../exceptions/THIS_EMAIL_IS_NOT_REGISTERED.exception';
import { THIS_USER_IS_ALREADY_ACTIVE_EXCEPTION } from '../exceptions/THIS_USER_IS_ALREADY_ACTIVE.exception';
import { INVALID_ACTIVATION_CODE_EXCEPTION } from '../exceptions/INVALID_ACTIVATION_CODE.exception';
import { CODE_EXPIRED_EXCEPTION } from '../exceptions/CODE_EXPIRED.exception';
import { ACTIVE_USER_SUCCESS } from '../responses/ACTIVE_USER_SUCCESS';

@Injectable()
export class UserActiveService {
  constructor(private readonly userRepository: UserRepository) {}
  async exec(activeUserDto: ActiveUserDto) {
    //check if user exists
    const isUser = await this.userRepository.getByEmail(activeUserDto.email);
    if (!isUser) throw new THIS_EMAIL_IS_NOT_REGISTERED_EXCEPTION();

    //get auth data
    const userAuthData = await this.userRepository.getUserAuthByUserId(
      isUser.id
    );

    //check if user is already active
    if (userAuthData.is_active)
      throw new THIS_USER_IS_ALREADY_ACTIVE_EXCEPTION();

    //check if code is valid
    if (userAuthData.activation_code !== activeUserDto.code)
      throw new INVALID_ACTIVATION_CODE_EXCEPTION();

    //check if code is expired
    const now = new Date().getTime();
    if (now > +userAuthData.activation_code_expiration)
      throw new CODE_EXPIRED_EXCEPTION();

    //active user
    await this.userRepository.updateUserAuth(
      { ...userAuthData, is_active: true },
      isUser.id
    );

    return new ACTIVE_USER_SUCCESS();
  }
}
