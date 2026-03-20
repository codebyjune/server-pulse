// server/src/modules/auth/auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
//                                    ↑ 'jwt' 对应 JwtStrategy 的名称
