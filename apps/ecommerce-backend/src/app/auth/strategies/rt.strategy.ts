import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants/constants';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: jwtConstants.REFRESH_SECRET_KEY,
    });
  }
  validate(payload: any) {
    // console.log('inside validate inside refresh strategy');
    // console.log(payload);
    return payload;
  }
}
const cookieExtractor: JwtFromRequestFunction = (req: Request) => {
  console.log('inside cookieExtractor');
  let token = null;
  if (req && req.session.refreshToken) {
    token = req.session.refreshToken;
  }
  console.log(token);
  return token;
};
