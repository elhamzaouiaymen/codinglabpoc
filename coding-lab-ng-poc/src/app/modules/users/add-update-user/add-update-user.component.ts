import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidationService } from '../../../services/validation.service';
import { FormErrorStateMatcher } from '../../../_helpers/form-error-state-matcher';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityService } from '../../../services/entity.service';
import { User } from '../../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit, OnDestroy {
  title: string;
  formMatcher = new FormErrorStateMatcher()
  userForm: FormGroup
  addMode: boolean;
  userId: number;
  user: User;
  activatedRouteParamsSubscription: Subscription;
  fetchUserSubscription: Subscription;
  createUserSubscription: Subscription;
  updateUserSubscription: Subscription;

  constructor(private fb: FormBuilder, 
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private backendApiService: EntityService<User>,
              private toastrService: ToastrService) {
    this.createForm();

    this.activatedRouteParamsSubscription = this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['id']
    })

    this.addMode = this.router.url.includes('add');
    this.title = this.addMode ? "Add new freelancer" : "Update Freelancer"
  }

  ngOnInit(){
    this.initFormData();
  }

  ngOnDestroy(){
    this.unsubscribeFromAllSubscription()
  }

  unsubscribeFromAllSubscription(){
    this.activatedRouteParamsSubscription.unsubscribe()
    this.fetchUserSubscription.unsubscribe()
  }

  addOrUpdateUser(){
    this.userForm['submitted'] = true;
    if(this.userForm.valid){

      const userObj : User = {
        date_of_birth: this.userForm.controls['date_of_birth'].value,
        email: this.userForm.controls['email'].value,
        gender: this.userForm.controls['gender'].value,
        hourly_rate: this.userForm.controls['hourly_rate'].value,
        name: this.userForm.controls['first_name'].value 
              + ' ' + this.userForm.controls['last_name'].value,
      }

      if(this.addMode){        
        this.handleCreateUser(userObj)
      }else{
        this.handleUpdateUser(userObj)
      }

      
    }
  }

  handleCreateUser(user: User){
    this.createUserSubscription = this.backendApiService.create(User, user).subscribe((data: any) => {
      if(data)
        this.toastrService.success('User has been created successfully.')
        this.goToDashboard()
    }, (err: HttpErrorResponse) =>{
      this.toastrService.error(err.message)
    })
  }

  handleUpdateUser(user: User){
    user['id'] = this.userId;
    this.updateUserSubscription = this.backendApiService.update(User, user).subscribe((data: any) => {
      if(data)
        this.toastrService.success('User has been updated successfully.')
        this.goToDashboard()
    }, (err: HttpErrorResponse) =>{
      this.toastrService.error(err.message)
    })
  }

  createForm(){
    this.userForm = this.fb.group({
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        date_of_birth: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        email: ['', [Validators.required, ValidationService.emailValidator]],
        hourly_rate: ['', [Validators.required, 
                          Validators.maxLength(2), 
                          Validators.minLength(2)]]
      });
      
    this.userForm['submitted'] = false;
  }

  initFormData(){
    if(!this.addMode && this.userId !== undefined){
      console.log('heyyy')
      let promise = this.fetchUser();
      promise.then((user: User)=>{
        this.userForm.controls['first_name'].setValue(user.name.split(' ')[0])
        this.userForm.controls['last_name'].setValue(user.name.split(' ')[1])
        this.userForm.controls['date_of_birth'].setValue(new Date(user.date_of_birth).getFullYear() 
                                                          + '-' + (new Date(user.date_of_birth).getUTCMonth() + 1)
                                                          + '-' + new Date(user.date_of_birth).getDate())
        this.userForm.controls['gender'].setValue(user.gender)
        this.userForm.controls['hourly_rate'].setValue(user.hourly_rate)
        this.userForm.controls['email'].setValue(user.email)
      })
    }
  }

  fetchUser(): Promise<User>{
    return new Promise<User>((resolve , reject)=>{
      this.fetchUserSubscription = this.backendApiService.findById(User, this.userId).subscribe((user: User) =>{
        resolve(user)
      }, (err: HttpErrorResponse) => {
        reject(err)
      })
    })
  }

  goToDashboard(){
    setTimeout(()=>{
      this.router.navigate(['users'])
    },1000)
  }

}
