/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { UserService } from '../user.service';
import { UserSignInDTO } from '../DTO/userSignIn.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ){
        const extractJwtFromCookie = (req: Request) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['access_token'];
          }
          return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        };
      
        super({
          ignoreExpiration: false,
          secretOrKey: configService.get<string>('JWT_SECRET'),
          jwtFromRequest: extractJwtFromCookie,
        });
    }

    async validate(payload: UserSignInDTO) {
        const user = await this.userService.findUser(payload.email);
    
        if (!user) throw new UnauthorizedException('Please log in to continue');
    
        return {
            id: user.id,
            isadmin: user.isadmin,
        };
    }
}