import {Injectable} from '@angular/core';
import {DocumentSnapshot} from '@angular/fire/firestore';
import {Observable, Subject} from 'rxjs';
import {PesFireStoreProviderService} from './pes-firestore-provider.service';

@Injectable({
  providedIn: 'root'
})
export class PresentationService {

  uid;

  constructor(public fireStore: PesFireStoreProviderService) {

  }


  getPresentation(uid,projectId,presentId)
  {
    let a = new Subject<any>();
    this.fireStore.collection(`usersC/${uid}/project/${projectId}/presentation`).doc(presentId).get().subscribe(next => a.next(next));

    return a as Observable<DocumentSnapshot<any>>
  }



}
