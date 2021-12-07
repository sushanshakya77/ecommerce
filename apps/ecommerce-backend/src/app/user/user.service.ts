import * as argon2 from 'argon2';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Register } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Register)
    private registerRespository: Repository<Register>
  ) {}
  async registerUser(
    fullname: string,
    email: string,
    username: string,
    password: string
  ): Promise<Register> {
    if (!(fullname && email && username && password)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'all input is required',
        },
        HttpStatus.FORBIDDEN
      );
    }
    const oldUser = await this.registerRespository.findOne({ username });
    // console.log(oldUser);
    if (oldUser) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'user already exists',
        },
        HttpStatus.FORBIDDEN
      );
    }

    const encryptedPassword = await argon2.hash('password');

    const registeredUser = this.registerRespository.create({
      fullname,
      email,
      username,
      password: encryptedPassword,
    });

    // const result = await registeredUser.save();
    // this.products.push(newProduct);
    // console.log(result);
    return this.registerRespository.save(registeredUser);
  }

  // loginUser(username: string, password: string) {}
}
