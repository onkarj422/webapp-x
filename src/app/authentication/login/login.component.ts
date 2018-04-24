import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CustomValidators } from 'ng4-validators';
import { AuthService } from '../../common/services/auth.service';
import { SessionService } from '../../common/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
  hide = true;

  constructor(private auth: AuthService, private session: SessionService) { 
  	this.loginForm = new FormGroup({
  		email: new FormControl('', Validators.compose([Validators.required, CustomValidators.email])),
  		password: new FormControl('', Validators.required)
  	});
  }

  login() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).then(data => {
        if (!data['error']) {
          console.log(data);
          this.session.start(data);
        }
      });
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
