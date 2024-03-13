/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DBInventoryService } from './DBServices/dbInventory.service';

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

  async getInventory(){
    return await this.dbInventoryService.findAllProduct();
  }

  async getInventoryItem(productid: string){
    // TODO: check if id is uuid or not
    return await this.dbInventoryService.findProduct(productid);
  }
}
