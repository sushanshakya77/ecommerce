import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { Login, Register } from './auth.user.entity';
import { jwtConstants } from './constants/constants';

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
    const oldUser = await this.registerRepository.findOne({
      where: {
        username: username,
      },
    });
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
    this.registerRepository.save(registeredUser);
    return registeredUser;
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
    const user = await this.registerRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!user) throw new BadRequestException('doesnt exist');

    console.log(user, password);

    if (await argon2.verify(user.password, password)) {
      const tokens = await this.createToken(user.username);
      return tokens;
    } else {
      throw new ForbiddenException('Access Denied');
    }
  }

  async refreshToken(username: string) {
    const oldUser = await this.registerRepository.findOne({
      where: {
        username: username,
      },
    });

    // console.log('inside service');
    // console.log(oldUser);
    if (!oldUser) throw new BadRequestException('doesnt exist');
    const newtoken = await this.createToken(username);

    return newtoken;
  }
}
