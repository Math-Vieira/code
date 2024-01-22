import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { THIS_EMAIL_IS_NOT_REGISTERED_EXCEPTION } from '../exceptions/THIS_EMAIL_IS_NOT_REGISTERED.exception';
import { NewPasswordCodeDto } from '../dto/new-password-code.dto';
import { USER_NOT_ACTIVE_EXCEPTION } from '../exceptions/USER_NOT_ACTIVE.exception';
import { createCode } from '@/shared/utils/functions/createCode';
import { minutesToMilliseconds } from '@/shared/utils/functions/minutesToMilliseconds';
import { UserAuthEntity } from '../entities/userAuth.entity';
import { SendEmailService } from '@/shared/services/sendEmail.service';
import { NEW_RESET_PASSWORD_CODE_TEMPLATE } from '@/shared/utils/htmlTemplates/new-reset-password-code';
import { NEW_RESET_PASSWORD_CODE_SUCCESS } from '../responses/NEW_RESET_PASSWORD_CODE_SUCCESS';

@Injectable()
export class UserNewPasswordCodeService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sendEmailService: SendEmailService
  ) {}
  async exec(newPasswordCodeDto: NewPasswordCodeDto) {
    //check if user exists
    const isUser = await this.userRepository.getByEmail(
      newPasswordCodeDto.email
    );
    if (!isUser) throw new THIS_EMAIL_IS_NOT_REGISTERED_EXCEPTION();

    //get auth data
    const userAuthData = await this.userRepository.getUserAuthByUserId(
      isUser.id
    );

    //check if user is active
    if (!userAuthData.is_active) throw new USER_NOT_ACTIVE_EXCEPTION();

    //create new recover code
    const code = createCode(6);
    await this.updateUserRecoverCode(isUser.id, code);
    await this.sendNewResetPasswordCodeEmail(isUser.email, code);

    return new NEW_RESET_PASSWORD_CODE_SUCCESS();
  }

  async updateUserRecoverCode(id: string, code: string): Promise<void> {
    await this.userRepository.updateUserAuth(
      {
        recover_password_code: code,
        recover_password_code_expiration: `${
          new Date().getTime() + minutesToMilliseconds(5)
        }`
      } as UserAuthEntity,
      id
    );
  }

  async sendNewResetPasswordCodeEmail(
    email: string,
    code: string
  ): Promise<void> {
    const payload = {
      to: email,
      subject: 'Recover password code',
      html: NEW_RESET_PASSWORD_CODE_TEMPLATE(code, email)
    };
    return await this.sendEmailService.sendEmail(payload);
  }
}
