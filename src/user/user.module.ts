/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entity/user.entity';
import { DBUserService } from './DBServices/dbUser.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),
    // PassportModule.register({ session: true }),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: { expiresIn: '1d' },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [UserController],
  providers: [UserService, DBUserService, JwtAuthGuard, ConfigService],
})
export class UserModule {}
