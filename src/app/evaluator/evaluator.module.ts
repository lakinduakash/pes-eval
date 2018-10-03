import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EvaluatorListComponent } from './evaluator-list/evaluator-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent, SignupComponent, EvaluatorListComponent]
})
export class EvaluatorModule { }
