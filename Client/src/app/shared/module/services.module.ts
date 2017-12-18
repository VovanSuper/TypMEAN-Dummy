import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import {
  ApiService,
  canDeactivate,
  ErrorService,
  EventsResolverService,
  EventRouteValidService,
  UserRouteValidService,
  UsersResolverService,
  AuthGuard,
  AuthService,
  DataStorageService,
  HttpHelpersService,
  UserStoreService,
  FbQueriesService,
  AnonymousGuard
} from './services/';

@NgModule({})
export class SharedServicesModule {
  constructor( @Optional() @SkipSelf() self: SharedServicesModule) {
    if (self) throw new Error('[SharedServicesModule] Should only be imported in App.module')
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedServicesModule,
      providers: [
        { provide: 'canLeave', useValue: canDeactivate },
        { provide: ErrorService, useClass: ErrorService },
        { provide: HttpHelpersService, useClass: HttpHelpersService },
        { provide: FbQueriesService, useClass: FbQueriesService },
        { provide: ApiService, useClass: ApiService },
        { provide: EventRouteValidService, useClass: EventRouteValidService },
        { provide: UserRouteValidService, useClass: UserRouteValidService },
        { provide: EventsResolverService, useClass: EventsResolverService },
        { provide: UsersResolverService, useClass: UsersResolverService },
        { provide: DataStorageService, useClass: DataStorageService },
        { provide: UserStoreService, useClass: UserStoreService },
        { provide: AuthService, useClass: AuthService },
        { provide: AuthGuard, useClass: AuthGuard },
        { provide: AnonymousGuard, useClass: AnonymousGuard },
        FormBuilder
      ]
    };
  }
}
