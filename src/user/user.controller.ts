/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpStatus, Options, Post, Req, Res, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { UserSignInDTO } from './DTO/userSignIn.dto';
import { Request, Response } from 'express';
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
            // domain: 'localhost',
            sameSite: true,
            secure: false,
            httpOnly: false,
        })
        .status(HttpStatus.OK)
        .json({
            access_token: token
        })
    }

    // @Options("login")
    // async handleOptions(@Res() res: Response) {
    //     res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    //     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    //     res.status(HttpStatus.NO_CONTENT).send();
    // }


    @Get("logout")
    signOut(@Res() res: Response){
        res.clearCookie('access_token', {
            secure: false,
            sameSite: true,
        }).json({
          msg: 'logout successful',
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get("users")
    getAllUser(
        // @Req() req: Request
    ){
        // console.log("user: ", req.user)
        return this.userService.findAllUser();
    }

    @UseGuards(JwtAuthGuard)
    @Get("user")
    getUser(
        @Req() req: Request
    ){
        const { email }: any = req.user;
        return this.userService.findUser(email);
    }

    @Get("seeduserdb")
    seedUserDB(){
        return this.userService.seedUserDB();
    }
}
