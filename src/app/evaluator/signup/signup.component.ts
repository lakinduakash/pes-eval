import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(170)
      ]),

    ])
  ]
})
export class SignupComponent implements OnInit {

  signupFormGroup:FormGroup;
  showSpinner=false;

  signupStates=['ALREADY_R','ERROR','VERIFICATION_SEND','SIGNUP'];

  state=this.signupStates[3];
  isHandest$;

  constructor(private fb:FormBuilder, private auth:AuthService,private breakPointObserver:BreakpointObserver) {
    this.signupFormGroup=fb.group({
      fName:['',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(1)])],
      lName:['',[Validators.required,Validators.maxLength(19)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      passwordc:['',Validators.required]
    },
      {
        validator: PasswordValidation.MatchPassword
      });


  ngOnInit() {
  }

}
