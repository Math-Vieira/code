import { Match } from '@/shared/decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  Matches
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'NAME_SHOULD_BE_STRING' })
  @IsNotEmpty({ message: 'NAME_SHOULD_NOT_BE_EMPTY' })
  @MinLength(6, { message: 'MIN_LENGTH_FOR_NAME_IS_6' })
  @ApiProperty({
    description: 'user name'
  })
  name: string;

  @IsString({ message: 'EMAIL_SHOULD_BE_A_STRING' })
  @IsEmail(undefined, { message: 'THE_EMAIL_SENDED_IS_INVALID' })
  @IsNotEmpty({ message: 'EMAIL_SHOULD_NOT_BE_EMPTY' })
  @ApiProperty({
    description: 'user e-mail'
  })
  email: string;

  @IsString({ message: 'PASSWORD_SHOULD_BE_A_STRING' })
  @MinLength(4, { message: 'PASSWORD_MIN_LENGTH_IS_4' })
  @IsNotEmpty({ message: 'PASSWORD_SHOULD_NOT_BE_EMPTY' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/, {
    message:
      'PASSWORD_MUST_BE_AT_LEAST_4_CHARACTERS_HAVE_AN_UPPERCASE_LETTER_A_LOWERCASE_LETTER_A_NUMBER'
  })
  @ApiProperty({
    description: 'user password'
  })
  password: string;

  @IsNotEmpty({ message: 'PASSWORD_CONFIRMATION_SHOULD_NOT_BE_EMPTY' })
  @IsString({ message: 'PASSWORD_CONFIRMATION_SHOULD_BE_A_STRING' })
  @Match('password', {
    message: 'PASSWORD_CONFIRMATION_IS_NOT_EQUAL_TO_PASSWORD'
  })
  @ApiProperty({
    description: 'user confirm password'
  })
  confirm_password: string;
}
