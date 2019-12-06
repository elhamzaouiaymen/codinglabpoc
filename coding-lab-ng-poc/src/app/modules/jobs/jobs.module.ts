import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AddUpdateJobComponent } from './add-update-job/add-update-job.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [JobsListComponent, JobDetailsComponent, AddUpdateJobComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    JobsRoutingModule,
    SharedModule
  ]
})
export class JobsModule { }
