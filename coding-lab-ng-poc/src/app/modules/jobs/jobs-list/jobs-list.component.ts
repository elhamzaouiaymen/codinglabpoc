import { Component, OnInit } from '@angular/core';
import { Job } from '../../../models/job.model';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.sass']
})
export class JobsListComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  remove(jobId: number){
    alert(jobId)
  }

}
