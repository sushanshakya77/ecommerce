import { RtStrategy } from './strategies/rt.strategy';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt.guard';

type IUser = {
  username: string;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(
    @Body('fullname') fullname: string,
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    return this.authService.registerUser(fullname, email, username, password);
  }
  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Req() request: Request
  ) {
    const tokens = await this.authService.loginUser(username, password);
    request.session.refreshToken = tokens.refreshToken;
    console.log(request.session);
    return tokens.accessToken;
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refreshtoken')
  refreshToken(@Req() request: Request) {
    const user = request.body as IUser;
    const refreshtoken = request.session.refreshToken;
    if (!refreshtoken) throw new BadRequestException('Not authenticated');

    return this.authService.refreshToken(user.username, refreshtoken);
  }
}
