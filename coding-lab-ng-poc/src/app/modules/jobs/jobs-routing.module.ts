import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { Routes, RouterModule } from '@angular/router';
import { AddUpdateJobComponent } from './add-update-job/add-update-job.component';
import { JobDetailsComponent } from './job-details/job-details.component';

const routes: Routes = [
  { path: '', component: JobsListComponent },
  { path: 'add', component: AddUpdateJobComponent },
  { path: 'update/:id', component: AddUpdateJobComponent },
  { path: 'job/:id/', component: JobDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class JobsRoutingModule { }
