import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  Matches
} from 'class-validator';

export class SignInUserDto {
  @IsString({ message: 'EMAIL_SHOULD_BE_A_STRING' })
  @IsNotEmpty({ message: 'EMAIL_SHOULD_NOT_BE_EMPTY' })
  @IsEmail(undefined, { message: 'THE_EMAIL_SENDED_IS_INVALID' })
  @ApiProperty({
    description: 'user e-mail'
  })
  email: string;

  @IsString({ message: 'PASSWORD_SHOULD_BE_A_STRING' })
  @IsNotEmpty({ message: 'PASSWORD_SHOULD_NOT_BE_EMPTY' })
  @MinLength(4, { message: 'PASSWORD_MIN_LENGTH_IS_4' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/, {
    message:
      'PASSWORD_MUST_BE_AT_LEAST_4_CHARACTERS_HAVE_AN_UPPERCASE_LETTER_A_LOWERCASE_LETTER_A_NUMBER'
  })
  @ApiProperty({
    description: 'user password'
  })
  password: string;
}
