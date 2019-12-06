import { Component, OnInit } from '@angular/core';
import { Job } from '../../../models/job.model';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.sass']
})
export class JobsListComponent implements OnInit {

  jobs: Job [] = [
    new Job(1,"A French Translator needed", "We are hiring a translator for our website content"),
    new Job(2,"A French Translator needed", "We are hiring a translator for our website content"),
    new Job(3,"A French Translator needed", "We are hiring a translator for our website content"),
    new Job(4,"A French Translator needed", "We are hiring a translator for our website content"),
    new Job(5,"A French Translator needed", "We are hiring a translator for our website content"),
  ]
  constructor() { }

  ngOnInit() {
  }

  remove(jobId: number){
    alert(jobId)
  }

}
