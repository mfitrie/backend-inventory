/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { DBInventoryService } from './DBServices/dbInventory.service';
import { Product } from './Entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
    ]),
    // UserModule
  ],
  controllers: [
    InventoryController
  ],
  providers: [
    InventoryService, 
    DBInventoryService,
    ConfigService,
    // JwtService
  ]
})
export class InventoryModule {}
