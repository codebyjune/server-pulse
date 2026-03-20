import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import type { Options } from '@dicebear/core';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 登录验证
  async login(username: string, password: string) {
    // 1. 查找用户
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('用户名不存在');
    }

    // 2. 验证密码
    const isValid = await this.userService.validatePassword(
      password,
      user.password,
    );
    if (!isValid) {
      throw new UnauthorizedException('密码错误');
    }

    // 3. 生成 JWT
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
      },
    };
  }

  // 注册
  async register(username: string, password: string) {
    // 检查用户是否已存在
    const existingUser = await this.userService.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('用户名已存在');
    }
    const options: Options = {
      seed:username,

      // ... other options
    };
    const avatar = createAvatar(adventurer, options).toDataUri();
    // 创建用户
    const user = await this.userService.create(username, password, avatar);
    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
    };
  }
}
