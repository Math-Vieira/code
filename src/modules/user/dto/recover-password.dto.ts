import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class RecoverPasswordDto {
  @IsString({ message: 'CODE_SHOULD_BE_STRING' })
  @IsNotEmpty({ message: 'CODE_SHOULD_NOT_BE_EMPTY' })
  @Length(6, 6, { message: 'CODE_SHOULD_BE_6_CHARACTERS' })
  @ApiProperty({
    description: 'activation code'
  })
  code: string;

  @IsString({ message: 'EMAIL_SHOULD_BE_A_STRING' })
  @IsNotEmpty({ message: 'EMAIL_SHOULD_NOT_BE_EMPTY' })
  @IsEmail(undefined, { message: 'THE_EMAIL_SENDED_IS_INVALID' })
  @ApiProperty({
    description: 'user e-mail'
  })
  email: string;
}
