import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormEditEventService {

  groupReceived:BehaviorSubject<any[]>=new BehaviorSubject(['1','2','3','4']);
  constructor() {

  }

  event = new EventEmitter()

}
