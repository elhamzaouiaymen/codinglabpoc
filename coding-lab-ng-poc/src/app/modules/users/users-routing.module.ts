import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'add', component: AddUpdateUserComponent },
  { path: 'update/:id', component: AddUpdateUserComponent },
  { path: 'user/:id', component: UserDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class UsersRoutingModule { }
