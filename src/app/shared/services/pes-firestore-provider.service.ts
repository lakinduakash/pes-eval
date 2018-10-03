import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {firBaseConfigPes} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PesFireStoreProviderService extends AngularFirestore {

}

export function PesFireStoreFactory(platformId: Object, zone: NgZone) {
  return new AngularFirestore(firBaseConfigPes, 'evalStore', false, null, platformId, zone);
}
