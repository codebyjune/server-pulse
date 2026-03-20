import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { username } });
  }
  async create(
    username: string,
    password: string,
    avatar?: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({
      username,
      password: hashedPassword,
      avatar,
    });
    return this.userRepo.save(user);
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
