import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng4-validators';

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

  constructor(private formBuilder: FormBuilder) { }

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
      console.log(value);
    } else {
      for (var i in controls) {
        controls[i].markAsTouched();
        controls[i].updateValueAndValidity();
      }
      console.log("Form invalid");
    }
  }

  get formArray(): AbstractControl | null { return <FormArray>this.registerForm.get('formArray'); }

  ngOnInit() {
    this.registerForm = new FormGroup({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          email: new FormControl('', Validators.compose([Validators.required, CustomValidators.email])),
          password: new FormControl('', Validators.required)
        }),
        this.formBuilder.group({
          name: new FormControl('', Validators.required),
          contact: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)]))  
        }),
        this.formBuilder.group({
          address: new FormControl('', Validators.required),
          state: new FormControl('', Validators.required),
          city: new FormControl('', Validators.required)
        })
      ])
    });
  }
}
