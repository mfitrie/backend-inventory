/* eslint-disable prettier/prettier */
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserService } from "../user.service";
import { UnauthorizedException } from "@nestjs/common";

export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly userService: UserService
    ){
        super();
    }

    validate(email: string){
        const user = this.userService.findUser(email);
        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}