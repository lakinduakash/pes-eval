import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import {SignupModule} from './signup/signup.module';
import {EvalFormModule} from './eval-form/eval-form.module';
import {EvalListModule} from './eval-list/eval-list.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    SignupModule,
    EvalFormModule,
    EvalListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
