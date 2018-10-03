import {NgModule, NgZone, PLATFORM_ID} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PesFireStoreFactory, PesFireStoreProviderService} from './services/pes-firestore-provider.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [{provide: PesFireStoreProviderService, deps: [PLATFORM_ID, NgZone], useFactory: PesFireStoreFactory}]
})
export class SharedModule {
}
