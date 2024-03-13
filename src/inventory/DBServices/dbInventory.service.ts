/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../Entity/product.entity';
import { Equal, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class DBInventoryService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ){}

    async seedDB(){
        try {
            const products = await this.productRepository.find();
            
            if(products.length === 0){
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const listProducts: any = Array(1000).fill(null).map((_item) => ({
                    id: faker.string.uuid(),
                    name: faker.commerce.product(),
                    description: faker.commerce.productDescription(),
                    price: faker.commerce.price(),
                    quantity: faker.number.int({ max: 100 }),
                    imagelink: faker.image.url(),
                }));

                await this.productRepository
                .createQueryBuilder()
                .insert()
                .into(Product)
                .values(listProducts)
                .execute();

                return true;
            }

            return false;

        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async findAllProduct(): Promise<Product[]>{
        try {
            return this.productRepository.find();
        } catch (error) {
            console.error(error);
            
            return null;
        }
    }

    async findProduct(productid: string): Promise<Product[]>{
        try {
            return this.productRepository.find({
                where: {
                    id: Equal(productid)
                }
            })
        } catch (error) {
            console.error(error);
            
            return null
        }
    }


}
