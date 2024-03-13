/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Get("/")
    getAllUser(){
        return this.userService.findAllUser();
    }

    @Get("seeduserdb")
    seedUserDB(){
        return this.userService.seedUserDB();
    }
}
