import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

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
      },
    };
  }

  // 注册
  async register(username: string, password: string) {
    // 检查用户是否已存在
    const existingUser = await this.userService.findByUsername(username);
    if (existingUser) {
      throw new UnauthorizedException('用户名已存在');
    }

    // 创建用户
    const user = await this.userService.create(username, password);
    return {
      id: user.id,
      username: user.username,
    };
  }
}
