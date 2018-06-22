import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, Subject, pipe } from 'rxjs';
import { tap, map, first, pluck } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable()
export class OrderService {

  public updateOrders = new Subject<any>();
  public updateCustomers = new Subject<any>();
  public updateFoodOrders = new Subject<any>();
  public refreshOrders = this.updateOrders.asObservable();
  public refreshCustomers = this.updateCustomers.asObservable();
  public refreshFoodOrders = this.updateFoodOrders.asObservable();

  constructor(
  	public api: HttpService, 
    public auth: AuthService,
    public data: DataService
  ) {

  }

  public addCustomer(regData) {
    let customerId: number = null;
    regData['password'] = '123456';
    regData['userRoleId'] = 2;
    return new Promise((resolve, reject) => {
      this.auth.register(regData).then(data => {
        if (data['result']) {
          customerId = data['userId'];
          resolve(customerId);
        } else if (data['error'] == "exists") {
          window.alert("Customer already exists!");
          console.log("Email address already registered!");
          reject(null);
        } else {
          window.alert("Server error occured!");
          console.log("Unknown error occurred!");
          reject(null);
        }
      })
    });
  }
 
  public addCustomerAddress(data) {
    return new Promise((resolve, reject) => {
      this.api.post(data, 'add_address').
        subscribe(
          data => resolve(data),
          error => reject(error)
        )
    });
  }

  public addCustomerIdForOrder(customerId) {
    return customerId;
  }

  async addSelectedSalads(selectedSalads, taskCount) {
    let salads = [];
    while (salads.length < taskCount) {
      for (var i in selectedSalads) {
        let foodTypeId = await this.getSaladFoodTypeId(selectedSalads[i]);
        salads.push({
          'saladId': parseInt(selectedSalads[i]),
          'foodTypeId': Number(foodTypeId),
          'isTaken': 0
        });
        if (salads.length == taskCount) {
          break;
        }
      } 
    }
    return salads;
  }

  public getDeliveryCount(mealPlanId: number) {
    return this.data.getAsyncWhere({
      'data':'meals',
      'dep': 'id',
      'value': mealPlanId
    }).pipe(
      pluck('deliveryCount')
    ).toPromise();
  }

  public getSaladFoodTypeId(saladId: number) {
    return this.data.getAsyncWhere({
      'data': 'salads',
      'dep': 'id',
      'value': saladId
    }).pipe(
      pluck('typeId')
    ).toPromise();
  }

  public addOrder(orderData) {
    return new Promise((resolve, reject) => {
      this.api.post(orderData, 'create_order').
        subscribe(
          data => resolve(data),
          error => reject(error)
        )
    });
  }

  public sortSalads(salads: any, sortBy: string) {
    let sortedSalads = [];
    for (var i in salads) {
      if (salads[i].type == sortBy || salads[i].type == "Both") {
        sortedSalads.push(salads[i]);
      }
    }
    return sortedSalads;
  }

  public formatDate(sqlDate: string) {
    let t = sqlDate.split(/[- :]/);
    let tn = [];
    for (var i in t) {
      tn.push(parseInt(t[i]));
    }
    let d = new Date(tn[0], tn[1]-1, tn[2], tn[3], tn[4], tn[5]);
    let date: string = d.toDateString();
    let time: string = d.toLocaleTimeString();
    let finalString = date;
    return finalString;
  }
}
