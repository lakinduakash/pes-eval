import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {DocumentSnapshot} from '@angular/fire/firestore';
import {PesFireStoreProviderService} from './pes-firestore-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private fireStore:PesFireStoreProviderService) { }

  getProject(uid,projectId)
  {
    let a = new Subject<any>();
    this.fireStore.collection(`usersC/${uid}/project`).doc(projectId).get().subscribe(next => a.next(next));

    return a as Observable<DocumentSnapshot<any>>
  }

  public getStudentsOfGroup(uid,projectId,groupId:string)
  {
    let subject = new Subject<any>();
    this.fireStore.collection(`usersC/${uid}/project`).doc(projectId).get().subscribe(doc =>
    {
      if(doc.data().students)
      {
        let a=doc.data().students as any[];
        subject.next(a.find(x=>x.group==groupId))

      }
    });

    return subject as Observable<any>
  }
}
