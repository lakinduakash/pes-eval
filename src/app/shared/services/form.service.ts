import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference, DocumentSnapshot, QuerySnapshot} from '@angular/fire/firestore';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Observable, Subject} from 'rxjs';
import {AuthService} from '../../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private fireStore: AngularFirestore, private authService: AuthService) {

  }

  saveForm(form, projectId: string, presentId: string) {
    let a = new Subject<DocumentReference>();

    if (projectId == undefined)
      fromPromise(this.fireStore.collection('form').add(JSON.parse(JSON.stringify(form)))).subscribe(
        next => a.next(next)
      );
    else {
      this.authService.user.subscribe(
        next => {
          if (next != null)
            fromPromise(this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).add(JSON.parse(JSON.stringify(form)))).subscribe(next => a.next(next))
        }
      )

    }

    return a as Observable<DocumentReference>
  }

  getLastId() {

  }

  updateLastId() {

  }

  getForm(id, projectId, presentId) {

    let a = new Subject<any>();

    this.authService.user.subscribe(next => {
        if (next != null)
          this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).doc(id).get().subscribe(next => a.next(next))
      }
    );
    return a as Observable<DocumentSnapshot<any>>

  }

  getAllForm(projectId: string, presentId: string) {
    let a = new Subject<QuerySnapshot<any>>();
    this.authService.user.subscribe(next => {
        if (next != null)
          this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).get().subscribe(next =>
            a.next(next))
      }
    );

    return a as Observable<QuerySnapshot<any>>
  }

  updateForm(projectId: string, presentId: string, documentPath: string, form) {
    let a = new Subject<any>();
    this.authService.user.subscribe(next => {
        if (next != null)
          fromPromise(this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).doc(documentPath).update(JSON.parse(JSON.stringify(form)))).subscribe(next => a.next(next))
      }
    );

    return a as Observable<any>
  }

  deleteForm(projectId: string, presentId: string, documentPath?: string, filter?) {
    let a = new Subject<any>();
    this.authService.user.subscribe(next => {
        if (next != null) {
          if (documentPath != undefined) {
            fromPromise(this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).doc(documentPath).delete()).subscribe(next => a.next(next))
          }

          else if (documentPath == undefined && filter != undefined) {
            fromPromise(this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).ref.where(filter.fieldPath, '==', filter.value).get()).subscribe(value => {
              value.docs.forEach(item =>
                fromPromise(this.fireStore.collection(`usersC/${next.uid}/project/${projectId}/presentation/${presentId}/form`).doc(item.id).delete()).subscribe(
                  next => a.next(next)
                ))

            })
          }
        }

      }
    );

    return a as Observable<any>
  }

  formProvider() {

  }
}
