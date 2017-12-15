import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent, UserDetailsComponent, UsersComponent } from './components/';
import { UsersResolverService } from '../shared/module/services/users-resolve.service';
import { UserRouteValidService } from '../shared/module/services/';

export const USERS_ROUTES: Routes = [
  {
    path: 'users', children: [
      { path: '', component: UsersComponent, resolve: { users: UsersResolverService }, pathMatch: 'full' },
      {
        path: ':id/details',
        component: UserDetailsComponent,
        canActivate: [UserRouteValidService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(USERS_ROUTES)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }