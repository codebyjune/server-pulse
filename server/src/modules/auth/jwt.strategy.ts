import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从 Header 提取
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', // 🔑 之后改到环境变量
    });
  }

  // 验证 token 后，返回用户信息
  async validate(payload: { sub: number; username: string }) {
    return { id: payload.sub, username: payload.username };
  }
}
