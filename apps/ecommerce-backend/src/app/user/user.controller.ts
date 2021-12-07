import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async register(
    @Body('fullname') fullname: string,
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    return this.userService.registerUser(fullname, email, username, password);
  }
  // @Post('login')
  // async login(
  //   @Body('username') username: string,
  //   @Body('password') password: string
  // ) {
  //   return this.userService.loginUser(username, password);
  // }
}
