import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthModule} from './core/auth/auth.module';
import {AngularFireModule} from '@angular/fire';
import {fireBaseConfig} from '../environments/environment';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRouteModule} from './route.module';
import {EvalSignInUpModule} from './eval-signin-up/eval-signin-up.module';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouteModule,
    AuthModule,
    AngularFireModule.initializeApp(fireBaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    SharedModule,
    FlexLayoutModule,
    EvalSignInUpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
