import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng4-validators';
import { Subject, Observable } from 'rxjs';
import { tap, map, first } from 'rxjs/operators';
import { DataService } from '../../common/services/data.service';
import { OrderService } from '../../common/services/order.service';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.scss']
})
export class AddOrdersComponent implements OnInit {

  customerForm: FormGroup;
	orderForm: FormGroup;
	deliveryForm: FormGroup;

  @ViewChild('stepper') stepper;
  @Output() fabClose = new EventEmitter<any>();
  addFab: boolean = false;
  existingCustomer: boolean = true;
  finalStep: boolean = false;
	clickEvent = new Subject<any>();
	customerSelectionEvent = this.clickEvent.asObservable();
  morningStartTime = {hour: 8, minute: 0, meriden: 'AM', format: 12};
  morningEndTime = {hour: 12, minute: 0, meriden: 'PM', format: 12};
  eveningStartTime = {hour: 6, minute: 0, meriden: 'PM', format: 12};
  eveningEndTime = {hour: 9, minute: 0, meriden: 'PM', format: 12};

  mealPlans = [];
  mealSizes = [];
  foodTypes = [];
  times = [];
  salads = [];
  saladsForSort = [];
  customers = [];
  orders = [];
  saladMaxCount = 0;
  selectedCount = 0;

  constructor(private fb: FormBuilder, private data: DataService, private order: OrderService) { 
    this.loadData();
  }

  loadData() {
    this.data.getIt('meals').subscribe(data => {
        this.mealPlans = data;
    });
    this.data.getIt('salads').subscribe(data => {
      this.salads = data;
      this.saladsForSort = data;
    });
    this.data.getIt('veg_nonveg').subscribe(data => {
      this.foodTypes = data;
    });
    this.data.getIt('o_d_timeslot').subscribe(data => {
      this.times = data;
    });
    this.data.getIt('customers').subscribe(data => {
      this.customers = data;
    });
    this.data.getIt('m_types').subscribe(data => {
      this.mealSizes = data;
    });
  }

  updateSelectedCount(count: number, select: any) {
    this.selectedCount = count;
    if (count > this.saladMaxCount) {
      window.alert('You have selected maximum number of salads for your meal plan!');
    }
  }

  setMaxCount(count: number) {
    this.saladMaxCount = Number(count);
  }

  selectionChange(event: any) {
    if (event.selectedIndex == 2) {
      if (!this.existingCustomer) {
        this.deliveryForm.controls.deliveryAddress.setValue(this.customerForm.controls.address.value);
        this.deliveryForm.controls.deliveryArea.setValue(this.customerForm.controls.area.value);
        this.deliveryForm.controls.deliveryContact.setValue(this.customerForm.controls.mobileNumber.value); 
      } else {
        let customerId = Number(this.customerForm.controls.customerId.value);
        this.data.getItWhere('customers', 'id', customerId).then(
          data => {
            this.deliveryForm.controls.deliveryAddress.setValue(data['address']);
            this.deliveryForm.controls.deliveryArea.setValue(data['area']);
            this.deliveryForm.controls.deliveryContact.setValue(data['mobileNumber']);
          }
        )
      }
      this.finalStep = true;
    } else {
      this.finalStep = false;
    }
  }

  onSelectFoodType(event: any) {
    if (event.value == 3) {
      this.saladsForSort = this.salads;
    } else {
      if (event.value == 1) {
        this.saladsForSort = this.order.sortSalads(this.salads, "Veg");
      } else if (event.value == 2) {
        this.saladsForSort = this.order.sortSalads(this.salads, "Non-Veg");
      }
    }
  }

  async submitOrder() {
    let orderDetails = this.orderForm.value, 
        deliveryDetails = this.deliveryForm.value,
        customerDetails = this.customerForm.value,
        addSt: boolean = true;
    let deliveryAddressId: number,
        customerId: number;
    if (!this.existingCustomer) {
      let cid = await this.order.addCustomer(this.customerForm.value);
      customerId = Number(cid);
      if (deliveryDetails.deliveryAddress == customerDetails.address && 
        deliveryDetails.deliveryArea == customerDetails.area &&
        deliveryDetails.deliveryContact == customerDetails.mobileNumber) {
        let addedCustomerData = await this.data.getItWhere('customers', 'id', customerId);
        deliveryAddressId = parseInt(addedCustomerData['addressId']);
      } else {
        let newAddressId = await this.order.addCustomerAddress({
          'address': deliveryDetails.deliveryAddress,
          'area': deliveryDetails.deliveryArea,
          'mobileNumber': deliveryDetails.deliveryContact,
          'customerId': customerId
        });
        if (newAddressId != null) {
          deliveryAddressId = Number(newAddressId);
        } else {
          addSt = false;
        }
      }
    } else {
      customerId = this.customerForm.value.customerId;
      let selectedCustomerData = await this.data.getItWhere('customers', 'id', customerId);
      deliveryAddressId = parseInt(selectedCustomerData['addressId']);
    }
    if (customerId != null && addSt == true) {
      this.addFab = false;
      let deliveryCount = await this.order.getDeliveryCount(orderDetails.mealId);
      let selectedSalads = await this.order.addSelectedSalads(orderDetails.saladId, deliveryCount);
      let orderData = {
        'statusId': 2,
        'paymentId': 3,
        'deliveryAddressId': deliveryAddressId,
        'timeSlotId': parseInt(deliveryDetails.timeSlotId),
        'morningTimeSlot': this.formatTimeSlot(deliveryDetails.morningStart, deliveryDetails.morningEnd),
        'eveningTimeSlot': this.formatTimeSlot(deliveryDetails.eveningStart, deliveryDetails.eveningEnd),
        'mealId': parseInt(orderDetails.mealId),
        'taskCount': Number(deliveryCount),
        'foodTypeId': parseInt(orderDetails.preferredFoodTypeId),
        'mealTypeId': parseInt(orderDetails.mealSize),
        'selectedSalads': selectedSalads,
        'customerId': parseInt(this.order.addCustomerIdForOrder(customerId))
      };
      this.order.addOrder(orderData).then(data => {
        this.fabClose.emit(false);
        this.order.updateOrders.next(true);
      });
    }
  }

  formatTimeSlot(start: string, end: string) {
    return (start+" - "+end);
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
      mobileNumber: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
      email: new FormControl('', Validators.email),
      address: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required)
  	};
  	let existingCustomerFormGroup = {
  		customerId: new FormControl('',Validators.required)
  	};
  	this.customerForm = new FormGroup(existingCustomerFormGroup);
  	this.customerSelectionEvent.subscribe(existing => {
  		if (!existing) {
  			this.existingCustomer = false;
  			this.customerForm = new FormGroup(addCustomerFormGroup);
  		} else {
  			this.existingCustomer = true;
  			this.customerForm = new FormGroup(existingCustomerFormGroup);
  		}
  	});
    let orderFormGroup = {
      mealId: new FormControl('', Validators.required),
      preferredFoodTypeId: new FormControl('', Validators.required),
      saladId: new FormControl('', Validators.required),
      saladSpecs: new FormControl(),
      mealSize: new FormControl('', Validators.required)
    }
    this.orderForm = new FormGroup(orderFormGroup);

    let deliveryFormGroup = {
      deliveryAddress: new FormControl('', Validators.required),
      deliveryArea: new FormControl('', Validators.required),
      deliveryContact: new FormControl('', Validators.required),
      timeSlotId: new FormControl('', Validators.required),
      morningStart: new FormControl('', Validators.required),
      morningEnd: new FormControl('', Validators.required),
      eveningStart: new FormControl('', Validators.required),
      eveningEnd: new FormControl('', Validators.required)
    }

    this.deliveryForm = new FormGroup(deliveryFormGroup);
  }

  ngAfterViewInit() {
    
  }

}
