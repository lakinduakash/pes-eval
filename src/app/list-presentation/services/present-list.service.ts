import {Injectable} from '@angular/core';
import {PesFireStoreProviderService} from '../../shared/services/pes-firestore-provider.service';
import {AuthService} from '../../core/auth/auth.service';
import {Observable, Subject} from 'rxjs';
import {DocumentSnapshot} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PresentListService {

  constructor(private pfp:PesFireStoreProviderService,private auth:AuthService) { }

  getPresentationList()
  {
    let s:Subject<any> =new Subject<any>();
    this.auth.user.subscribe(
      user=>{
        console.log(user);
        if(user !=null) {
          this.pfp.collection(`usersE`).doc(user.uid).get().subscribe(
            next => s.next(next)
          )
        }
      }
    );

    return s as Observable<DocumentSnapshot<any>>

  }

  getProjectData(uid,pid){
    this.pfp.collection(`usersC/${uid}`)

  }
}
