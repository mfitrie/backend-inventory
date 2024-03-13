/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private jwtService: JwtService,
    ){}

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const token = this.extractJwtFromCookie(req);

        if(!token){
            throw new UnauthorizedException();
        }

        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get<string>('JWT_SECRET')
            });

    
            req['user'] = payload;
    
            return true;
            
        } catch (error) {
            throw new UnauthorizedException();
        }

    }


    private extractJwtFromCookie = (req: Request): string | null => {
        if (req && req.cookies && req.cookies.access_token) {
            return req.cookies.access_token;
        }
        return null;
    };
}