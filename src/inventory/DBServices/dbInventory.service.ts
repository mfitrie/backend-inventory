/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../Entity/product.entity';
import { Equal, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { ProductDTO } from '../DTO/product.dto';

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

    async findAllProduct(page: number = 1, pageSize: number = 10):  Promise<{ products: Product[], total: number }>{
        try {
            // return this.productRepository.find();
            const [products, total] = await this.productRepository.findAndCount({
                skip: (page - 1) * pageSize,
                take: pageSize,
            });
            
            return {
                products,
                total,
            }

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

    async updateProduct(payload: ProductDTO){
        try {
            return await this.productRepository.save({
                id: payload.id,
                ...payload
            });

        } catch (error) {
            console.error(error);
        }
    }

    async saveProduct(payload: ProductDTO): Promise<Product>{
        try {
            const newProduct = this.productRepository.create(payload);
            
            return this.productRepository.save(newProduct);

        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteProduct(productid: string){
        try {
            return await this.productRepository.delete({ id: productid })
            
        } catch (error) {
            console.error(error);
        }
    }


}
