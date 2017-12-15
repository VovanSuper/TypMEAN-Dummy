import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { EventsResolverService } from './shared/module/services/';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/';

export const ROUTES_DEFINITION: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'authenticate', redirectTo: '/auth/signin' },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(ROUTES_DEFINITION
  // , {
  //     preloadingStrategy: PreloadAllModules
  //   , enableTracing: true
  // }
);
