import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode
} from '@nestjs/common';
import { UserCreateService } from './services/user-create.service';
import { UserDeleteService } from './services/user-delete.service';
import { UserEditService } from './services/user-edit.service';
import { UserGetAllService } from './services/user-get-all.service';
import { UserGetService } from './services/user-get.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserActiveService } from './services/user-active.service';
import { ActiveUserDto } from './dto/active-user.dto';
import { UserSignInService } from './services/user-signIn.service';
import { SignInUserDto } from './dto/signIn-user.dto';
import { HttpStatus } from '@nestjs/common';
import { NewActivationCodeDto } from './dto/new-activation-code.dto';
import { UserCreateNewActivationCodeService } from './services/user-create-new-activation-code.service';
import { NewPasswordCodeDto } from './dto/new-password-code.dto';
import { UserNewPasswordCodeService } from './services/user-new-password-code.service';
// import { RecoverPasswordDto } from './dto/recover-password.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userCreateService: UserCreateService,
    private readonly userDeleteService: UserDeleteService,
    private readonly userEditService: UserEditService,
    private readonly userGetAllService: UserGetAllService,
    private readonly userGetService: UserGetService,
    private readonly userActiveService: UserActiveService,
    private readonly userSignInService: UserSignInService,
    private readonly userCreateNewActivationCodeService: UserCreateNewActivationCodeService,
    private readonly userNewPasswordCodeService: UserNewPasswordCodeService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userCreateService.exec(createUserDto);
  }

  @Post('active')
  @HttpCode(HttpStatus.OK)
  async active(@Body() activeUserDto: ActiveUserDto) {
    return await this.userActiveService.exec(activeUserDto);
  }

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInUserDto: SignInUserDto) {
    return await this.userSignInService.exec(signInUserDto);
  }

  @Post('new-activation-code')
  @HttpCode(HttpStatus.OK)
  async newActivationCode(@Body() newActivationCodeDto: NewActivationCodeDto) {
    return await this.userCreateNewActivationCodeService.exec(
      newActivationCodeDto
    );
  }

  @Post('new-password-code')
  @HttpCode(HttpStatus.OK)
  async newPasswordCode(@Body() newPasswordCodeDto: NewPasswordCodeDto) {
    return await this.userNewPasswordCodeService.exec(newPasswordCodeDto);
  }

  // @Post('recover-password')
  // @HttpCode(HttpStatus.OK)
  // async recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto) {
  //   return await this.userCreateNewActivationCodeService.exec(
  //     recoverPasswordDto
  //   );
  // }

  @Get()
  findAll() {
    return this.userGetAllService.exec();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGetService.exec(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userEditService.exec(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDeleteService.exec(id);
  }
}
