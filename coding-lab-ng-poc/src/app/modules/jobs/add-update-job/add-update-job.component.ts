import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Job } from '../../../models/job.model';
import { EntityService } from '../../../services/entity.service';

@Component({
  selector: 'app-add-update-job',
  templateUrl: './add-update-job.component.html',
  styleUrls: ['./add-update-job.component.sass']
})
export class AddUpdateJobComponent implements OnInit {
  jobForm: any;


  constructor(private fb: FormBuilder, private backendApiService: EntityService<Job>) {
    this.createForm()
  }

  ngOnInit() {}

  createForm(){
    this.jobForm = this.fb.group([{
        title: ['', Validators.required],
        description: ['', Validators.required]
    }]);
  }

  addJob(job: Job){
    this.backendApiService.create(Job, this.jobForm.value).subscribe((data: any) => {
      console.log(data)
    })
  }

}
