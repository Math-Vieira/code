import { AuthService } from './../../auth/auth.service';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { SignInUserDto } from '../dto/signIn-user.dto';
import { THIS_EMAIL_IS_NOT_REGISTERED_EXCEPTION } from '../exceptions/THIS_EMAIL_IS_NOT_REGISTERED.exception';
import { compare } from 'bcrypt';
import { INVALID_CREDENTIALS_EXCEPTION } from '../exceptions/INVALID_CREDENTIALS.exception';
import { SIGN_IN_SUCCESS } from '../responses/SIGN_IN_USER_SUCCESS';
import { USER_NOT_ACTIVE_EXCEPTION } from '../exceptions/USER_NOT_ACTIVE.exception';

@Injectable()
export class UserSignInService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ) {}
  async exec(signInUserDto: SignInUserDto) {
    const userData = await this.userRepository.getByEmail(signInUserDto.email);
    if (!userData) throw new THIS_EMAIL_IS_NOT_REGISTERED_EXCEPTION();

    //check if user is active
    if (!userData.Auth.is_active) throw new USER_NOT_ACTIVE_EXCEPTION();

    //Check if password is valid
    const isPasswordValid = await this.comparePassword(
      signInUserDto.password,
      userData.password
    );
    if (!isPasswordValid) throw new INVALID_CREDENTIALS_EXCEPTION();

    const jwtToken = await this.authService.createAccessToken(
      userData.id,
      userData.Auth.admin
    );

    return new SIGN_IN_SUCCESS(jwtToken);
  }

  async checkIfUserExists(email: string): Promise<boolean> {
    const user = await this.userRepository.getByEmail(email);
    return !!user;
  }

  private async comparePassword(
    password: string,
    encryptedPassword: string
  ): Promise<boolean> {
    return await compare(password, encryptedPassword);
  }
}
