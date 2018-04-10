import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CustomValidators } from 'ng4-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
  hide = true;

  constructor() { 
  	this.loginForm = new FormGroup({
  		email: new FormControl('', Validators.compose([Validators.required, CustomValidators.email])),
  		password: new FormControl('', Validators.required)
  	});
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);  
    } else {
      for (var i in this.loginForm.controls) {
        this.loginForm.controls[i].markAsTouched();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }    
  }

  onSignIn() {
    console.log("Google signin");
  }

  ngOnInit() {
  	
  }

}
