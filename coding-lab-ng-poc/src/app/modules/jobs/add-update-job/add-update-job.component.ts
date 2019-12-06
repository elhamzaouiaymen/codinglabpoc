import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Job } from '../../../models/job.model';
import { EntityService } from '../../../services/entity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormErrorStateMatcher } from '../../../_helpers/form-error-state-matcher';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-update-job',
  templateUrl: './add-update-job.component.html',
  styleUrls: ['./add-update-job.component.sass']
})
export class AddUpdateJobComponent implements OnInit {
  title: string;
  formMatcher = new FormErrorStateMatcher()
  jobForm: FormGroup
  addMode: boolean
  jobId: number
  job: Job
  activatedRouteParamsSubscription: Subscription
  fetchJobSubscription: Subscription
  createJobSubscription: Subscription
  updateJobSubscription: Subscription

  constructor(private fb: FormBuilder, 
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private backendApiService: EntityService<Job>,
              private toastrService: ToastrService) {
    this.createForm();

    this.activatedRouteParamsSubscription = this.activatedRoute.params.subscribe((params: any) => {
      this.jobId = params['id']
    })

    this.addMode = this.router.url.includes('add');
    this.title = this.addMode ? "Post new job" : "Update job"
  }

  ngOnInit(){
    this.initFormData();
  }

  ngOnDestroy(){
    this.unsubscribeFromAllSubscription()
  }

  unsubscribeFromAllSubscription(){
    if( this.activatedRouteParamsSubscription !== undefined) this.activatedRouteParamsSubscription.unsubscribe()
    if( this.fetchJobSubscription !== undefined) this.fetchJobSubscription.unsubscribe()
    if( this.createJobSubscription !== undefined) this.createJobSubscription.unsubscribe()
    if( this.updateJobSubscription !== undefined) this.updateJobSubscription.unsubscribe()
  }

  addOrUpdateJob(){
    this.jobForm['submitted'] = true;
    if(this.jobForm.valid){

      const jobObj : Job = {
        title: this.jobForm.controls['title'].value,
        description: this.jobForm.controls['description'].value
      }

      if(this.addMode){        
        this.handleCreateJob(jobObj)
      }else{
        this.handleUpdateJob(jobObj)
      }

      
    }
  }

  handleCreateJob(job: Job){
    this.createJobSubscription = this.backendApiService.create(Job, job).subscribe((data: any) => {
      if(data)
        this.toastrService.success('Job has been posted successfully.')
        this.goToDashboard()
    }, (err: HttpErrorResponse) =>{
      this.toastrService.error(err.message)
    })
  }

  handleUpdateJob(job: Job){
    job['id'] = this.jobId;
    this.updateJobSubscription = this.backendApiService.update(Job, job).subscribe((data: any) => {
      if(data)
        this.toastrService.success('Job has been updated successfully.')
        this.goToDashboard()
    }, (err: HttpErrorResponse) =>{
      this.toastrService.error(err.message)
    })
  }

  createForm(){
    this.jobForm = this.fb.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(10)]],
      });
      
    this.jobForm['submitted'] = false;
  }

  initFormData(){
    if(!this.addMode && this.jobId !== undefined){
      console.log('heyyy')
      let promise = this.fetchJob();
      promise.then((job: Job)=>{
        this.jobForm.controls['title'].setValue(job.title)
        this.jobForm.controls['description'].setValue(job.description)
      })
    }
  }

  fetchJob(): Promise<Job>{
    return new Promise<Job>((resolve , reject)=>{
      this.fetchJobSubscription = this.backendApiService.findById(Job, this.jobId).subscribe((job: Job) =>{
        resolve(job)
      }, (err: HttpErrorResponse) => {
        reject(err)
      })
    })
  }

  goToDashboard(){
    setTimeout(()=>{
      this.router.navigate(['jobs'])
    },1000)
  }

}
