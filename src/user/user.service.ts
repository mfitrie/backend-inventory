/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DBUserService } from './DBServices/dbUser.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        private readonly dbUserService: DBUserService,
        private readonly jwtService: JwtService
    ){}



    async signIn(email: string, pass: string){
        try {
            const user = await this.findUser(email);
            
            if(user?.password !== pass){
                return null;
            }
    
            const payload = {
                id: user.id,
                isadmin: user.isadmin,
            }
            
    
            return this.jwtService.sign(payload)
            
        } catch (error) {
            console.error(error);
        }
    }


    async findUser(email: string){
        return await this.dbUserService.findUser(email);
    }


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
