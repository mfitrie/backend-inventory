/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ProductDTO } from './DTO/product.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { JwtAuthGuard } from 'src/user/Guards/jwt-auth.guard';

@UsePipes(ZodValidationPipe)
@Controller('api')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @UseGuards(JwtAuthGuard)
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


    @UseGuards(JwtAuthGuard)
    @Get("inventory/:productid")
    // FIX: id need to be uuid for validation
    getInventoryItem(
        @Param('productid') productid: ProductDTO["id"]
    ) {
        return this.inventoryService.getInventoryItem(productid);
    }


    @UseGuards(JwtAuthGuard)
    @Post("add-inventory")
    createInventory(@Body() payload: ProductDTO) {
        return this.inventoryService.createInventory(payload);
    }


    @UseGuards(JwtAuthGuard)
    @Patch("update-inventory")
    updateInventory(@Body() payload: ProductDTO) {
        return this.inventoryService.updateInventory(payload);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete("delete-inventory/:productid")
    // FIX: id need to be uuid for validation
    deleteInvenroty(@Param('productid') productid: string) {
        return this.inventoryService.deleteInventory(productid);
    }


}
