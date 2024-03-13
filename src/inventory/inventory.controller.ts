/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ProductDTO } from './DTO/product.dto';

@Controller('api')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @Get("inventory")
    async getInventory() {
        return await this.inventoryService.getInventory();
    }

    @Get("inventory/seeddb")
    seedDB() {
        return this.inventoryService.seedDB();
    }

    @Get("inventory/:productid")
    getInventoryItem(
        @Param('productid') productid: ProductDTO["id"]
    ) {
        return this.inventoryService.getInventoryItem(productid);
    }

    @Post("add-inventory")
    createInventory(@Body() payload: any) {
        return payload;
    }

    @Patch("update-inventory")
    updateInventory(@Body() payload: string) {
        return payload;
    }

    @Delete("delete-inventory/:productid")
    deleteInvenroty(@Param('productid') productid: string) {
        return productid;
    }


}
