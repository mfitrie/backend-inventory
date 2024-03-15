/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './inventory/Entity/product.entity';
import { User } from './user/Entity/user.entity';
import { LocalStrategy } from './user/Strategy/local.strategy';
// import { JwtModule } from '@nestjs/jwt';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>('POSTGRES_HOST'),
        port: parseInt(configService.get<string>('POSTGRES_PORT')),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        ssl: true,
        entities: [
          Product,
          User,
        ],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Product
    ]),
    // PassportModule,
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     global: true,
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: { expiresIn: '1d' },
    //   }),
    //   inject: [ConfigService],
    // }),
    InventoryModule,
    // UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LocalStrategy
  ],
})
export class AppModule {}
