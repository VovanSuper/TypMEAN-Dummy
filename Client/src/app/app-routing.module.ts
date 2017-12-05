import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const ROUTES_CONFIG: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'events', loadChildren: './events/events.module#EventsModule' },
  { path: 'users', loadChildren: 'users/users.module#UsersModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES_CONFIG, {enableTracing: true, preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }