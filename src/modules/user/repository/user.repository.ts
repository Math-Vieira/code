import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { createCode } from '@/shared/utils/functions/createCode';
import { minutesToMilliseconds } from '@/shared/utils/functions/minutesToMilliseconds';
import { UserAuthEntity } from '../entities/userAuth.entity';
import { UserPreferenceEntity } from '../entities/userPreference.entity';

interface CompleteUserData extends UserEntity {
  Auth: UserAuthEntity;
  Preference: UserPreferenceEntity;
}

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserEntity): Promise<UserEntity & UserAuthEntity> {
    const user = await this.prisma.user.create({ data });
    const userAuth = await this.createUserAuth(user.id);
    return { ...user, ...userAuth };
  }

  // async update(id: string, data: UserEntity): Promise<UserEntity> {
  //   return await this.prisma.user.update({
  //     data,
  //     where: {
  //       id: id
  //     }
  //   });
  // }

  // async delete(id: string): Promise<UserEntity> {
  //   return await this.prisma.user.delete({
  //     where: {
  //       id: id
  //     }
  //   });
  // }

  // async get(id: string): Promise<UserEntity> {
  //   return await this.prisma.user.findUnique({ where: { id: id } });
  // }

  async getByEmail(email: string): Promise<CompleteUserData> {
    return await this.prisma.user.findUnique({
      where: { email: email },
      include: {
        Auth: true,
        Preference: true
      }
    });
  }

  async getUserAuthByUserId(id: string): Promise<UserAuthEntity> {
    return await this.prisma.userAuth.findUnique({
      where: { user_id: id }
    });
  }
  // async getAll(): Promise<UserEntity[]> {
  //   return await this.prisma.user.findMany();
  // }

  private async createUserAuth(id: string): Promise<UserAuthEntity> {
    const userAuth = await this.prisma.userAuth.create({
      data: {
        user_id: id,
        activation_code: createCode(6),
        activation_code_expiration: `${
          new Date().getTime() + minutesToMilliseconds(5)
        }`,
        is_active: false,
        admin: false
      }
    });

    return userAuth;
  }

  async updateUserAuth(
    data: UserAuthEntity,
    user_id: string
  ): Promise<UserAuthEntity> {
    return await this.prisma.userAuth.update({
      data,
      where: {
        user_id: user_id
      }
    });
  }
}
