import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricsModule } from './modules/metrics/metrics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      location: 'data.db',
      autoSave: true,
      autoLoadEntities: true,
      synchronize: true,
    }),

    MetricsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
