import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { EntityService } from '../../../services/entity.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass']
})
export class UserDetailsComponent implements OnInit {
  user: User
  userId: number
  activatedRouteSubscription: Subscription
  fetchCurrentUserSubscription: Subscription

  constructor(private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private backendService: EntityService<User>) {

      this.activatedRouteSubscription =  this.activatedRoute.params.subscribe((params: any) => {
        this.userId = params['id']
      })

    }

  ngOnInit() {
    this.fetchCurrentUser()
  }

  ngOnDestroy(){
  if(this.fetchCurrentUserSubscription !== undefined) this.fetchCurrentUserSubscription.unsubscribe()
  if(this.activatedRouteSubscription !== undefined) this.activatedRouteSubscription.unsubscribe()
  }

  fetchCurrentUser(){
    this.showLoader();
    if(this.userId !== undefined){
      this.fetchCurrentUserSubscription = this.backendService.findById(User, this.userId).subscribe((user: User) => {
      this.user = user
      this.hideLoader()
    }, (error: HttpErrorResponse) => {
      console.log(error.message)
    })
    }
  }

  showLoader(){
  this.spinnerService.show()
  }

  hideLoader(){
  setTimeout(() => {
  this.spinnerService.hide()
  }, 500);
  }

}
