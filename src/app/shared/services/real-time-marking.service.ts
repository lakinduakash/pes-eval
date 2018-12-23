import {Injectable} from '@angular/core';
import {PesFireStoreProviderService} from './pes-firestore-provider.service';
import {AuthService} from '../../core/auth/auth.service';
import {getPath} from '../model/firstore-path';
import {Observable, of, Subject} from 'rxjs';
import {Action, AngularFirestore, DocumentSnapshot} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RealTimeMarkingService {

  constructor(public pesFireStore:PesFireStoreProviderService,public auth:AuthService,public userFireStore:AngularFirestore) { }

  getCurrentStates(uid,projectId,presentId)
  {
    let s:Subject<Action<DocumentSnapshot<any> > >=new Subject();
    this.auth.user.subscribe(
      user=>
      {
        if(user!=null)
        {
          this.pesFireStore.collection(getPath(uid,projectId,presentId)).doc(presentId).snapshotChanges().subscribe(next=>s.next(next))
        }
      }
    );

    return s as Observable<Action<DocumentSnapshot<any>>>
  }

  saveFormFinal(uid,projectId,presentId,formId,group,finalMarks)
  {
    this.auth.user.subscribe(
      user=>
      {
        if(user!=null)
        {
          return of(this.pesFireStore.collection(getPath(uid,projectId)+`/${projectId}/mark/${group}/${presentId}`).doc(user.uid).set(finalMarks))
        }
      }
    )

  }

  saveFormTemp(formId,form)
  {
    this.auth.user.subscribe(
      user=>
      {
        if(user!=null)
        {
          return of(this.userFireStore.collection(`temp`).doc(formId).set(form))
        }
      }
    )
  }

  getTempForm(formId)
  {
    this.auth.user.subscribe(
      user=>
      {
        if(user!=null)
        {
          return of(this.userFireStore.collection(`temp`).doc(formId).get())
        }
      }
    )
  }

  deleteTempForm(formId)
  {
    this.auth.user.subscribe(
      user=>
      {
        if(user!=null)
        {
          return of(this.userFireStore.collection(`temp`).doc(formId).delete())
        }
      }
    )
  }

}

