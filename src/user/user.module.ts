/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entity/user.entity';
import { DBUserService } from './DBServices/dbUser.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ])
  ],
  controllers: [UserController],
  providers: [UserService, DBUserService]
})
export class UserModule {}
