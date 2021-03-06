import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng4-validators';
import { AuthService } from '../../common/services/auth.service';
import { SessionService } from '../../common/services/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	@ViewChild('stepper') stepper;
  registerForm: FormGroup;
  currentStepIndex: number;
  stepLength: number;
	hide = true;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private session: SessionService) { }

  mobileNoValidation(event: any) {
  	const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  stepChange() {
    this.currentStepIndex = this.stepper.selectedIndex + 1;
    this.stepLength = this.stepper._steps.length;
  }

  register() {
    var array = this.registerForm.controls['formArray'] as FormArray;
    var controls = array.controls[2]['controls'];
    var value = {};
    if (this.registerForm.valid) {
      var formArray = this.registerForm.value.formArray;
      for (var n in formArray) {
        for (var l in formArray[n]) {
          value[l] = formArray[n][l];
        }
      }
      value['userRoleId'] = 2;
      this.auth.register(value).then(
        data => {
          if (data['result']) {
            console.log(data);
            this.session.start(data);
          } else if (data['error'] == "exists") {
            console.log("Email address already registered!");
          } else {
            console.log("Unknown error occurred!");
          }
        }
      );
    } else {
      for (var i in controls) {
        controls[i].markAsTouched();
        controls[i].updateValueAndValidity();
      }
      console.log("Form invalid");
    }
  }

  get formArray() { return <FormArray>this.registerForm.get('formArray'); }

  ngOnInit() {
    this.registerForm = new FormGroup({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          email: new FormControl('', Validators.compose([Validators.required, CustomValidators.email])),
          password: new FormControl('', Validators.required)
        }),
        this.formBuilder.group({
          firstname: new FormControl('', Validators.required),
          lastname: new FormControl('', Validators.required),
          contact: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)]))  
        }),
        this.formBuilder.group({
          address: new FormControl('', Validators.required),
          area: new FormControl('', Validators.required),
          city: new FormControl('', Validators.required)
        })
      ])
    });
  }
}
