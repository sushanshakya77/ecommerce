import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants/constants';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: jwtConstants.REFRESH_SECRET_KEY,
      passReqToCallback: true,
    });
  }
  validate(payload: any) {
    return {
      ...payload,
    };
  }
}
const cookieExtractor: JwtFromRequestFunction = (req: Request) => {
  let token = null;
  if (req && req.session.refreshToken) {
    token = req.session.refreshToken;
  }
  return token;
};
