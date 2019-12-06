import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { User } from '../../../models/user.model';
import { EntityService } from '../../../services/entity.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertData } from '../../../models/alert-data';
import { PopupService } from '../../../services/popup.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef
  alertData: AlertData
  alertActionSubscription: Subscription
  usersSubscription : Subscription
  users: User[] = []
  constructor(private backendApiService: EntityService<User>, 
              private toastrService: ToastrService,
              private spinnerService: NgxSpinnerService,
              private _ps: PopupService,
              private modalService: BsModalService) {}

  ngOnInit() {
    this.showLoader();
    this.usersSubscription = this.backendApiService.findAll(User).subscribe((response: any) => {
      this.users = response.data
      this.hideLoader();
    })
  }

  ngOnDestroy(){
    this.unsubscribeFromAllSubscriptions()
  }

  unsubscribeFromAllSubscriptions(){
    this.usersSubscription.unsubscribe()
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
      _title: "Delete user",
      _text: "Once the user is deleted it cannot be restored. Do you confirm this action ?",
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

  proceedUserDeletion(uid: number){
    this.backendApiService.delete(User, uid).subscribe((response: any) => {
      this.users = this.users.filter((user :User) => user.id !== uid)
      this.toastrService.success('User has been deleted successfully.')
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
