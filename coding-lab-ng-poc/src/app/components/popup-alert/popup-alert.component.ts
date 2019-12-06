import { Component, OnInit, Input } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { AlertData } from '../../models/alert-data';

@Component({
  selector: 'app-popup-alert',
  templateUrl: './popup-alert.component.html',
  styleUrls: ['./popup-alert.component.sass']
})
export class PopupAlertComponent implements OnInit {

  @Input()
  alertData: AlertData

  constructor(private _ps: PopupService) { }

  ngOnInit() {
  }

  performPositiveAction(){
    this._ps.setPositiveActionState(true)
  }

  performNegativeAction(){
    this._ps.setPositiveActionState(false)
  }

}
