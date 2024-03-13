/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Res, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { UserSignInDTO } from './DTO/userSignIn.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';
// import { LocalGuard } from './Guards/local.guard';

@UsePipes(ZodValidationPipe)
@Controller('api')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Post("login")
    // @Get("login")
    async signIn(
        @Body() payload: UserSignInDTO,
        @Res() res: Response
    ){
        const { email, password } = payload;
        // const email = "Daniella_Collier@yahoo.com";
        // const password = "mWKbxDTs9Fm7qta";

        const token = await this.userService.signIn(email, password);

        if(!token){
            throw new UnauthorizedException();
        }

        return res
        .cookie('access_token', token, {
            maxAge: 2592000000,
            sameSite: true,
            secure: false,
            httpOnly: true,
        })
        .json({
            access_token: token
        })
    }

    @Get("logout")
    signOut(@Res() res: Response){
        res.clearCookie('access_token').json({
          msg: 'logout successful',
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get("user")
    getAllUser(
        // @Req() req: Request
    ){
        // console.log("user: ", req.user)
        return this.userService.findAllUser();
    }

    @Get("seeduserdb")
    seedUserDB(){
        return this.userService.seedUserDB();
    }
}
