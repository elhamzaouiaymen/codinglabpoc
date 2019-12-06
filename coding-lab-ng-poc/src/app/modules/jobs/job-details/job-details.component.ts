import { Component, OnInit, OnDestroy } from '@angular/core';
import { Job } from '../../../models/job.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityService } from '../../../services/entity.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.sass']
})
export class JobDetailsComponent implements OnInit, OnDestroy {

  job: Job
  jobId: number
  activatedRouteSubscription: Subscription;
  fetchCurrentJobSubscription: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private backendService: EntityService<Job>) {

                this.activatedRouteSubscription =  this.activatedRoute.params.subscribe((params: any) => {
                  this.jobId = params['id']
                })

              }

  ngOnInit() {
    this.fetchCurrentJob()
  }

  ngOnDestroy(){
    if(this.fetchCurrentJobSubscription !== undefined) this.fetchCurrentJobSubscription.unsubscribe()
    if(this.activatedRouteSubscription !== undefined) this.activatedRouteSubscription.unsubscribe()
  }

  fetchCurrentJob(){
    if(this.jobId !== undefined){
      this.fetchCurrentJobSubscription = this.backendService.findById(Job, this.jobId).subscribe((job: Job) => {
        this.job = job
      })
    }
  }

}
