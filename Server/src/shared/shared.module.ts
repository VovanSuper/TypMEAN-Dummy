import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

@Module({
  components: [
    AuthService,
    UsersService
  ],
  exports: [
    AuthService,
    UsersService
  ]
})
export class SharedModule { }