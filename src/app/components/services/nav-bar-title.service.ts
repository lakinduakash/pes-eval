import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarTitleService {

  title: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
  }

  setTitle(title: string) {
    this.title.next(title)
  }

  getTitle(): Observable<string> {
    return this.title as Observable<string>
  }
}
