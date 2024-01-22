import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserCreateService } from './services/user-create.service';
import { UserDeleteService } from './services/user-delete.service';
import { UserEditService } from './services/user-edit.service';
import { UserGetAllService } from './services/user-get-all.service';
import { UserGetService } from './services/user-get.service';
import { PrismaService } from '@/shared/services/prisma.service';
import { UserRepository } from './repository/user.repository';
import { SesModule } from '@nextnm/nestjs-ses';
import { SendEmailService } from '@/shared/services/sendEmail.service';
import { UserActiveService } from './services/user-active.service';
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_KEY
} from '@/shared/utils/constants/AWS';
import { UserSignInService } from './services/user-signIn.service';
import { AuthService } from '../auth/auth.service';
import { UserCreateNewActivationCodeService } from './services/user-create-new-activation-code.service';
import { UserNewPasswordCodeService } from './services/user-new-password-code.service';

@Module({
  imports: [
    SesModule.forRoot({
      secret: AWS_SECRET_KEY,
      apiKey: AWS_ACCESS_KEY_ID,
      region: AWS_REGION
    })
  ],
  controllers: [UserController],
  providers: [
    UserCreateService,
    UserDeleteService,
    UserEditService,
    UserGetAllService,
    UserGetService,
    PrismaService,
    UserRepository,
    SendEmailService,
    UserActiveService,
    UserSignInService,
    AuthService,
    UserCreateNewActivationCodeService,
    UserNewPasswordCodeService
  ]
})
export class UserModule {}
