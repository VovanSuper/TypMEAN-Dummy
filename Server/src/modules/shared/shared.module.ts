import { Module } from '@nestjs/common';
import { FacebookStrategy, JwtStrategy } from "./middlewares/passport";
import { UsersService, AuthService, EventsService } from './services/';

@Module({
  components: [
    FacebookStrategy,
    JwtStrategy,
    UsersService,
    AuthService,
    EventsService
  ],
  exports: [
    FacebookStrategy,
    JwtStrategy,
    UsersService,
    EventsService,
    AuthService,
  ]
})
export class SharedModule { }