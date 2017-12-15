import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';

@Module({
  modules: [
    SharedModule,
    EventsModule,
    UsersModule
  ]
})
export class ApplicationModule { }