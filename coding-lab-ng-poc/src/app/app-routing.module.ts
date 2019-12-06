import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { JobsListComponent } from './modules/jobs/jobs-list/jobs-list.component';

const routes: Routes = [
  {
    path: 'jobs',
    loadChildren: () => import('./modules/jobs/jobs.module').then(mod => mod.JobsModule),
  },

  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(mod => mod.UsersModule),
  },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
