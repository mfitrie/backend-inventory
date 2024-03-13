/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ProductDTO } from './DTO/product.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@UsePipes(ZodValidationPipe)
@Controller('api')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @Get("inventory?")
    getInventory(
        @Query("page") page: string,
        @Query("pageSize") pageSize: string,
    ) {
        return this.inventoryService.getInventory(+page, +pageSize);
    }

    @Get("inventory/seeddb")
    seedDB() {
        return this.inventoryService.seedDB();
    }

    @Get("inventory/:productid")
    // FIX: id need to be uuid for validation
    getInventoryItem(
        @Param('productid') productid: ProductDTO["id"]
    ) {
        return this.inventoryService.getInventoryItem(productid);
    }

    @Post("add-inventory")
    createInventory(@Body() payload: ProductDTO) {
        return this.inventoryService.createInventory(payload);
    }

    @Patch("update-inventory")
    updateInventory(@Body() payload: ProductDTO) {
        return this.inventoryService.updateInventory(payload);
    }

    @Delete("delete-inventory/:productid")
    // FIX: id need to be uuid for validation
    deleteInvenroty(@Param('productid') productid: string) {
        return this.inventoryService.deleteInventory(productid);
    }


}
