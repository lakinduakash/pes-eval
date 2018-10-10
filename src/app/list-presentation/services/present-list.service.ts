import {Injectable} from '@angular/core';
import {PesFireStoreProviderService} from '../../shared/services/pes-firestore-provider.service';
import {AuthService} from '../../core/auth/auth.service';
import {Observable, Subject} from 'rxjs';
import {Action, DocumentSnapshot} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PresentListService {

  constructor(private pfp:PesFireStoreProviderService,private auth:AuthService) { }

  getPresentationList()
  {
    let s:Subject<Action<DocumentSnapshot<any>>> =new Subject<Action<DocumentSnapshot<any>>>();
    this.auth.user.subscribe(
      user=>{
        if(user !=null)
          this.pfp.collection(`usersE`).doc(user.uid).snapshotChanges().subscribe(
            next=> s.next(next)
          )
      }
    );

    return s as Observable<Action<DocumentSnapshot<any>>>

  }

  getProjectData(uid,pid){
    this.pfp.collection(`usersC/${uid}`)

  }
}
