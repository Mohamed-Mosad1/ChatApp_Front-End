import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { preventUnsavedChangesGuard } from './core/guards/prevent-unsaved-changes.guard';
import { MemberDetailsResolver } from './_resolvers/member-details-resolver';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent), },
  { path: 'login', loadComponent: () => import('./components/auth/login/login.component').then( (m) => m.LoginComponent ), },
  { path: 'register', loadComponent: () => import('./components/auth/register/register.component').then( (m) => m.RegisterComponent ), },
  { path: 'reset-password', loadComponent: () => import('./components/auth/reset-password/reset-password.component').then( (m) => m.ResetPasswordComponent ), },
  
  { path: '', runGuardsAndResolvers: 'always', canActivate: [authGuard], children: [
    { path: 'members', loadComponent: () => import('./components/members/member-list/member-list.component').then( (m) => m.MemberListComponent ), },
    { path: 'member/:userName', loadComponent: () => import( './components/members/member-details/member-details.component' ).then((m) => m.MemberDetailsComponent), resolve: { member: MemberDetailsResolver }, },
    { path: 'members/edit', loadComponent: () => import('./components/members/member-edit/member-edit.component').then( (m) => m.MemberEditComponent ), canDeactivate: [preventUnsavedChangesGuard], },
    { path: 'lists', loadComponent: () => import('./components/lists/lists.component').then( (m) => m.ListsComponent ), },
    { path: 'message', loadComponent: () => import('./components/messages/messages.component').then( (m) => m.MessagesComponent ), },
    { path: 'admin', loadComponent: () => import('./Admin/admin-panel/admin-panel.component').then( (m) => m.AdminPanelComponent ), canActivate: [adminGuard], },
  ],
},

{ path: '**', loadComponent: () => import('./components/not-found/not-found.component').then( (m) => m.NotFoundComponent ) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
