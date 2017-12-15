import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { EnvVariables } from './variables.token';
import { Variables } from './dev.variables';

@NgModule({})
export class EnvironmentsModule {
  constructor( @Optional() @SkipSelf() self: EnvironmentsModule) {
    if (self) throw new Error('Should only be imported in App.module')
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EnvironmentsModule,
      providers: [
        {
          provide: EnvVariables,
          // useFactory instead of useValue so we can easily add more logic as needed.
          useValue: Variables
        }
      ]
    }
  }
}