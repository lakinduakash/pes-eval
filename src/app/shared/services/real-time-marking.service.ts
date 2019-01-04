import {Injectable} from '@angular/core';
import {PesFireStoreProviderService} from './pes-firestore-provider.service';
import {AuthService} from '../../core/auth/auth.service';
import {getPath} from '../model/firstore-path';
import {BehaviorSubject, from, Observable, of, Subject} from 'rxjs';
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
    let s=new Subject();
    this.auth.user.subscribe(
      user=>
      {
        if(user!=null)
        {
          from(this.pesFireStore.collection(getPath(uid,projectId)+`/${projectId}/mark`).doc(group).set({group:group})).
          subscribe(next=>
            this.pesFireStore.collection(getPath(uid,projectId)+`/${projectId}/mark/${group}/${presentId}`).doc(user.uid).set(finalMarks).
            then(ni=>s.next('saved'))
          )

        }
      }
    );

    return s as Observable<any>

  }

  checkExistSavedForm(uid,projectId,presentId,group)
  {
    let s =new BehaviorSubject<boolean>(false);
    this.auth.user.subscribe(
      user=> {
        if (user != null && group !='')
          this.pesFireStore.collection(getPath(uid, projectId) + `/${projectId}/mark/${group}/${presentId}`).doc(user.uid).get().subscribe(
            next=>s.next(next.exists)
          )
      });
    return s as Observable<boolean>

  }

  saveFormTemp(formId,form):Observable<any>
  {
    let o=new Observable();
    this.auth.user.subscribe(
      user=>
      {
        if(user!=null)
        {
          o= of(this.userFireStore.collection(`temp`).doc(formId).set(form))
        }
      }
    );
    return o;
  }

  getTempForm(formId)
  {
    let s:Subject<any>=new Subject();
    this.auth.user.subscribe(
      user=>
      {
        if(user!=null)
        {
          this.userFireStore.collection(`temp`).doc(formId).get().subscribe(next=>{s.next(next)})
        }
      }
    );
    return s as Observable<any>;
  }

  deleteTempForm(formId)
  {
    this.auth.user.subscribe(
      user=>
      {
        if(user!=null)
        {
          this.userFireStore.collection(`temp`).doc(formId).delete().then(next=>console.log('cache form deleted'))
        }
      }
    )
  }

}

