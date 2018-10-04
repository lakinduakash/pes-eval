import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {MatCardModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [LoginComponent, SignupComponent]
})
export class EvalSignInUpModule {
}
