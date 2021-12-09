import { jwtConstants } from './constants/constants';
import * as argon2 from 'argon2';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Login, Register } from './auth.user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Register)
    private registerRepository: Repository<Register>,
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,
    private jwtService: JwtService
  ) {}
  async registerUser(
    fullname: string,
    email: string,
    username: string,
    password: string
  ): Promise<Register> {
    const oldUser = await this.registerRepository.findOne({ username });
    // console.log(oldUser);
    if (oldUser) {
      throw new BadRequestException('User Already Exists!!');
    }
    const encryptedPassword = await argon2.hash(password);
    const registeredUser = this.registerRepository.create({
      fullname,
      email,
      username,
      password: encryptedPassword,
    });

    // const result = await registeredUser.save();
    // this.products.push(newProduct);
    // console.log(result);
    return this.registerRepository.save(registeredUser);
  }

  async createToken(username: string) {
    const accessToken = await this.jwtService.signAsync(
      { username },
      { secret: jwtConstants.ACCESS_SECRET_KEY, expiresIn: '1h' }
    );

    const refreshToken = await this.jwtService.signAsync(
      { username },
      { secret: jwtConstants.REFRESH_SECRET_KEY, expiresIn: '30d' }
    );

    return { accessToken, refreshToken };
  }

  async loginUser(username: string, password: string) {
    const user = await this.registerRepository.findOne({ username });
    if (!user) throw new BadRequestException('doesnt exist');

    console.log(user, password);

    if (await argon2.verify(user.password, password)) {
      const tokens = await this.createToken(user.username);
      return tokens;
    } else {
      throw new ForbiddenException('Access Denied');
    }
  }

  async refreshToken(username: string, refreshToken: string) {
    const oldUser = await this.registerRepository.findOne({ username });
    if (!oldUser) throw new BadRequestException('doesnt exist');
    const newtoken = await this.createToken(username);

    return newtoken;
  }
}
