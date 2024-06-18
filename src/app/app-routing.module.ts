import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MemberDetailsComponent } from './components/members/member-details/member-details.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListsComponent } from './components/lists/lists.component';
import { authGuard } from './core/guards/auth.guard';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './core/guards/prevent-unsaved-changes.guard';
import { MemberDetailsResolver } from './_resolvers/member-details-resolver';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: '', runGuardsAndResolvers: 'always', canActivate: [authGuard], children: [
      { path: 'members', component: MemberListComponent },
      { path: 'member/:userName', component: MemberDetailsComponent, resolve: {member: MemberDetailsResolver} },
      { path: 'members/edit', component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard] },
      { path: 'lists', component: ListsComponent },
      { path: 'message', component: MessagesComponent },
    ],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
