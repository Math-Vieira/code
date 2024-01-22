import { SendEmailService } from './../../../shared/services/sendEmail.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/user.repository';
import { THIS_EMAIL_IS_ALREADY_USED } from '../exceptions/USER_ALREADY_EXISTS.exception';
import { FREE_PLAN_ID } from '@/shared/utils/constants/PLANS';
import { UserEntity } from '../entities/user.entity';
import { genSalt, hash } from 'bcrypt';
import { CREATE_USER_SUCCESS } from '../responses/CREATE_USER_SUCCESS';
import { ACTIVE_ACCOUNT_EMAIL_TEMPLATE } from '@/shared/utils/htmlTemplates/active-account-template';

@Injectable()
export class UserCreateService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sendEmailService: SendEmailService
  ) {}
  async exec(createUserDto: CreateUserDto) {
    const userExist = await this.checkIfUserExists(createUserDto.email);
    if (userExist) throw new THIS_EMAIL_IS_ALREADY_USED();

    //create a free user
    const userData = await this.formatUserDataPayload(createUserDto);
    const user = await this.userRepository.create(userData);

    //send email to user
    await this.sendEmail(user.email, user.activation_code, user.name);

    return new CREATE_USER_SUCCESS();
  }

  async checkIfUserExists(email: string): Promise<boolean> {
    const user = await this.userRepository.getByEmail(email);
    return !!user;
  }

  private async formatUserDataPayload(
    createUserDto: CreateUserDto
  ): Promise<UserEntity> {
    const { email, name, password } = createUserDto;
    const encryptedPassword = await this.hashPassword(password);

    return {
      email,
      name,
      password: encryptedPassword,
      plan_id: FREE_PLAN_ID
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    const encryptedPassword = await hash(password, salt);
    return encryptedPassword;
  }

  private async sendEmail(
    email: string,
    activationCode: string,
    userName: string
  ): Promise<void> {
    const payload = {
      to: email,
      subject: 'Account Activation',
      html: ACTIVE_ACCOUNT_EMAIL_TEMPLATE(userName, activationCode, email)
    };
    return await this.sendEmailService.sendEmail(payload);
  }
}
