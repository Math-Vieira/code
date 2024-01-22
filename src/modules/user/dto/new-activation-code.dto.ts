import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class NewActivationCodeDto {
  @IsString({ message: 'EMAIL_SHOULD_BE_A_STRING' })
  @IsNotEmpty({ message: 'EMAIL_SHOULD_NOT_BE_EMPTY' })
  @IsEmail(undefined, { message: 'THE_EMAIL_SENDED_IS_INVALID' })
  @ApiProperty({
    description: 'user e-mail'
  })
  email: string;
}
