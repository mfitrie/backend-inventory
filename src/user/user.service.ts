/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DBUserService } from './DBServices/dbUser.service';

@Injectable()
export class UserService {
    constructor(
        private readonly dbUserService: DBUserService
    ){}

    async seedUserDB(){
        try {
            const isSeed = this.dbUserService.seedUserDB();
    
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

    async findAllUser(){
        return await this.dbUserService.findAllUser();
    }
}
