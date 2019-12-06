import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  positiveActionState = new BehaviorSubject(null);

  constructor() {}

  setPositiveActionState(state: boolean) {
    this.positiveActionState.next(state);
  }
}
