import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class DataService {

  constructor(
  	private api: HttpService
  ) { 

  }

  getCustomers() {
  	return this.api.getData("customers");
  }

  getDeliveryMen() {

  }

  getChiefs() {

  }

  getOrders() {

  }

  getDeliveries() {

  }

  getDayTask() {

  }

  getSalads() {

  }

  getMealPlans() {

  }
}
