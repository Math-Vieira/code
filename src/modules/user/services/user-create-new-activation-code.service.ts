import { THIS_USER_IS_ALREADY_ACTIVE_EXCEPTION } from './../exceptions/THIS_USER_IS_ALREADY_ACTIVE.exception';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { THIS_EMAIL_IS_NOT_REGISTERED_EXCEPTION } from '../exceptions/THIS_EMAIL_IS_NOT_REGISTERED.exception';
import { NewActivationCodeDto } from '../dto/new-activation-code.dto';
import { createCode } from '@/shared/utils/functions/createCode';
import { minutesToMilliseconds } from '@/shared/utils/functions/minutesToMilliseconds';
import { SendEmailService } from '@/shared/services/sendEmail.service';
import { NEW_ACTIVATION_CODE_TEMPLATE } from '@/shared/utils/htmlTemplates/new-activation-code-template';
import { UserAuthEntity } from '../entities/userAuth.entity';
import { NEW_ACTIVATION_CODE_SUCCESS } from '../responses/NEW_ACTIVATION_CODE_SUCCESS';

@Injectable()
export class UserCreateNewActivationCodeService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sendEmailService: SendEmailService
  ) {}
  async exec(newActivationCodeDto: NewActivationCodeDto) {
    //check if user exists
    const isUser = await this.userRepository.getByEmail(
      newActivationCodeDto.email
    );
    if (!isUser) throw new THIS_EMAIL_IS_NOT_REGISTERED_EXCEPTION();

    if (isUser.Auth.is_active)
      throw new THIS_USER_IS_ALREADY_ACTIVE_EXCEPTION();

    //create new activation code
    const code = createCode(6);
    await this.updateUserActivationCode(isUser.id, code);
    await this.sendNewActivationCodeEmail(isUser.email, code);

    return new NEW_ACTIVATION_CODE_SUCCESS();
  }

  async updateUserActivationCode(id: string, code: string): Promise<void> {
    await this.userRepository.updateUserAuth(
      {
        activation_code: code,
        activation_code_expiration: `${
          new Date().getTime() + minutesToMilliseconds(5)
        }`
      } as UserAuthEntity,
      id
    );
  }

  async sendNewActivationCodeEmail(email: string, code: string): Promise<void> {
    const payload = {
      to: email,
      subject: 'Activation code',
      html: NEW_ACTIVATION_CODE_TEMPLATE(code, email)
    };
    return await this.sendEmailService.sendEmail(payload);
  }
}
