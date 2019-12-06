import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../models/job.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-data-paginator',
  templateUrl: './data-paginator.component.html',
  styleUrls: ['./data-paginator.component.sass']
})
export class DataPaginatorComponent implements OnInit {

  @Input('data')
  data: Job | User[];

  constructor() { }

  ngOnInit() {
  }

}
