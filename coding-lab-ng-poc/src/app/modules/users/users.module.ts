import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [UsersListComponent, AddUpdateUserComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    SharedModule,
    RouterModule,  
    NgxSpinnerModule
  ]
})
export class UsersModule { }
