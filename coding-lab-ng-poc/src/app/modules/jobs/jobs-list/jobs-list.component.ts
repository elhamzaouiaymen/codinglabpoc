import { Component, OnInit, TemplateRef } from '@angular/core';
import { Job } from '../../../models/job.model';
import { Subscription } from 'rxjs';
import { AlertData } from '../../../models/alert-data';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EntityService } from '../../../services/entity.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { PopupService } from '../../../services/popup.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html'
})
export class JobsListComponent implements OnInit {
  modalRef: BsModalRef
  alertData: AlertData
  alertActionSubscription: Subscription
  fetchJobsSubscription : Subscription
  jobs: Job[] = []
  constructor(private backendApiService: EntityService<Job>, 
              private toastrService: ToastrService,
              private spinnerService: NgxSpinnerService,
              private _ps: PopupService,
              private modalService: BsModalService) {}

  ngOnInit() {
    this.showLoader();
    this.fetchJobsSubscription = this.backendApiService.findAll(Job).subscribe((response: any) => {
      this.jobs = response.data
      this.hideLoader();
    })
  }

  ngOnDestroy(){
    this.unsubscribeFromAllSubscriptions()
  }

  unsubscribeFromAllSubscriptions(){
    this.fetchJobsSubscription.unsubscribe()
  }

  showLoader(){
    this.spinnerService.show()
  }

  hideLoader(){
    setTimeout(() => {
      this.spinnerService.hide()
    }, 500);
  }

  remove(uid: number, tmpl: TemplateRef<any>){
    this.alertData = {
      _title: "Delete Job",
      _text: "Once the job is deleted it cannot be restored. Do you confirm this action ?",
      _positiveAction: "Confirm",
      _negativeAction: "Cancel"
    }

    this.showAlert(tmpl)

    this.alertActionSubscription = this._ps.positiveActionState.subscribe((state: boolean) => {
      if(state){
        this.proceedUserDeletion(uid);
      }else{
        this.dismissAlert()
      }
    })
  }

  proceedUserDeletion(jobId: number){
    this.backendApiService.delete(Job, jobId).subscribe((response: any) => {
      this.jobs = this.jobs.filter((job: Job) => job.id !== jobId)
      this.toastrService.success('Job has been deleted successfully.')
      this.dismissAlert()
      this.alertActionSubscription.unsubscribe()
    }, (err: HttpErrorResponse) => {
      this.toastrService.error(err.message)  
    })
  }

  showAlert(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

  dismissAlert(){
    this.modalRef.hide()
  }

}
