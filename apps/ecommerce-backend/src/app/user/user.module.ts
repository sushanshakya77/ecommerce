import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Register } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Register])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
