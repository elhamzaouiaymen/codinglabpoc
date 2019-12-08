import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AlertData } from '../../models/alert-data';

@Component({
  selector: 'app-popup-alert',
  templateUrl: './popup-alert.component.html',
  styleUrls: ['./popup-alert.component.sass']
})
export class PopupAlertComponent implements OnInit {

  @Input()
  alertData: AlertData

  @Output()
  onNegativeActionPerformed: EventEmitter<boolean> = new EventEmitter()

  @Output()
  onPosiitiveActionPerformed: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  performPositiveAction(){
    this.onPosiitiveActionPerformed.emit({
      performed: true,
      actionName: this.alertData._actionName,
      _extraData: this.alertData._extraData
    })
  }

  performNegativeAction(){
    this.onNegativeActionPerformed.emit(true)
  }

}
