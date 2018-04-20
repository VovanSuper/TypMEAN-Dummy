import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    SharedModule,
    AuthModule,
    EventsModule,
    UsersModule
  ]
})
export class ApplicationModule { }