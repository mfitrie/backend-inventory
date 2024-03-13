/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { User } from "../Entity/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { faker } from "@faker-js/faker";

@Injectable()
export class DBUserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async seedUserDB(){
        try {
            const users = await this.userRepository.find();

            if(users.length === 0){
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const listProducts: any = Array(10).fill(null).map((_item) => ({
                    id: faker.string.uuid(),
                    name: faker.commerce.product(),
                    phoneno: faker.phone.number(),
                    address: faker.location.streetAddress(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    isadmin: faker.datatype.boolean(),
                }));
    
                await this.userRepository
                .createQueryBuilder()
                .insert()
                .into(User)
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

    async findAllUser(): Promise<User[]>{
        try {
            return await this.userRepository.find();

        } catch (error) {
            console.error(error);
            
            return null;
        }
    }

}