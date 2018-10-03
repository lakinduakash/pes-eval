import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PesFirestoreProviderService} from './services/pes-firestore-provider.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [PesFirestoreProviderService]
})
export class SharedModule {
}
