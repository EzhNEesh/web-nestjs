import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Req } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request } from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.fromCookies,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  private static fromCookies(@Req() req: Request): string | null {
    if (
      req.cookies &&
      'token' in req.cookies &&
      req.cookies.token.length > 0
    ) {
      return req.cookies.token;
    }
    return null;
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}