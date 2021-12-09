import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;
}

@Entity()
export class Login {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
