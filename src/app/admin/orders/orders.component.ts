import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng4-validators';
import { Subject ,  Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

	customerForm: FormGroup;
	orderForm: FormGroup;
	deliveryForm: FormGroup;
  @ViewChild('stepper') stepper;
  addFab: boolean = false;
  existingCustomer: boolean = true;
	clickEvent = new Subject<any>();
	customer = this.clickEvent.asObservable();
  finalStep: boolean = false;

  constructor(private fb: FormBuilder) { 

  }

  selectionChange(event: any) {
    console.log(event);
    if (event.selectedIndex == 2) {
      this.finalStep = true;
    } else {
      this.finalStep = false;
    }
  }

  submitOrder() {
    console.log(this.customerForm.value);
    this.addFab = false;
  }

  mobileNoValidation(event: any) {
  	const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit() {
  	let addCustomerFormGroup = {
  		firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
      email: new FormControl('', Validators.email),
      address: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required)
  	};
  	let existingCustomerFormGroup = {
  		customerId: new FormControl('',Validators.required)
  	};
  	this.customerForm = new FormGroup(existingCustomerFormGroup);
  	this.customer.subscribe(existing => {
  		if (!existing) {
  			this.existingCustomer = false;
  			this.customerForm = new FormGroup(addCustomerFormGroup);
  		} else {
  			this.existingCustomer = true;
  			this.customerForm = new FormGroup(existingCustomerFormGroup);
  		}
  	});
  }


}
