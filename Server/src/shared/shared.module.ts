import { Module } from '@nestjs/common';
import { UsersService, AuthService } from './services/';
import { FacebookStrategy, JwtStrategy } from "./services/passport";

@Module({
  components: [
    FacebookStrategy,
    JwtStrategy,
    AuthService,
    UsersService
  ],
  exports: [
    FacebookStrategy,
    JwtStrategy,
    UsersService,
    AuthService,
  ]
})
export class SharedModule { }