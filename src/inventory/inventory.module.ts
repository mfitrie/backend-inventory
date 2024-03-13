/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { DBInventoryService } from './DBServices/dbInventory.service';
import { Product } from './Entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
    ])
  ],
  controllers: [
    InventoryController
  ],
  providers: [
    InventoryService, 
    DBInventoryService,
  ]
})
export class InventoryModule {}
