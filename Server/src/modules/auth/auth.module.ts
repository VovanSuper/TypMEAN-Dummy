import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as passport from 'passport';
import { SharedModule } from '../shared/shared.module';
import { loggerMiddleware } from '../shared/middlewares/';
import { AuthController } from './controllers/';
import { AddTokenMiddleware } from './middlewares/add-jwt.middleware';
import { AuthService } from '../shared/services/auth.service';

@Module({
  imports: [SharedModule],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(loggerMiddleware).forRoutes(AuthController);

    return consumer
      .apply(passport.authenticate('facebook-token', { session: false }))
      .forRoutes(AuthController);
  }
}
