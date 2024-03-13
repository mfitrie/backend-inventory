/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DBInventoryService } from './DBServices/dbInventory.service';
import { ProductDTO } from './DTO/product.dto';

@Injectable()
export class InventoryService {
  constructor(
    private readonly dbInventoryService: DBInventoryService
  ){}

  async seedDB(){
    try {
        const isSeed = await this.dbInventoryService.seedDB();

        if(isSeed){
            return {
                message: "DB seed successful",
            }
        }

        return {
            message: "DB already have data",
        }

    } catch (error) {
        return {
            message: "Error seeding db",
        }
    }
    
  }

  async getInventory(page: number, pageSize: number){
    return await this.dbInventoryService.findAllProduct(page, pageSize);
  }

  async getInventoryItem(productid: string){
    return await this.dbInventoryService.findProduct(productid);
  }

  async createInventory(payload: ProductDTO){
    return await this.dbInventoryService.saveProduct(payload);
  }

  async updateInventory(payload: ProductDTO){
    return await this.dbInventoryService.updateProduct(payload);
  }

  async deleteInventory(productid: string){
    await this.dbInventoryService.deleteProduct(productid);
  }
}
