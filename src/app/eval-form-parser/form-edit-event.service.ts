import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormEditEventService {

  constructor() {
  }

  event = new EventEmitter()

}
