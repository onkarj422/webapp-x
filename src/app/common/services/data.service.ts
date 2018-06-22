import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, Subject, BehaviorSubject, pipe } from 'rxjs';
import { tap, map, first } from 'rxjs/operators';
import { FoodTasks, FoodTask } from '../interfaces/food-task';

@Injectable()
export class DataService {

	public foodTasksSubject: BehaviorSubject<FoodTasks> = new BehaviorSubject<FoodTasks>([]);
	public foodOrdersSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
	public deliveryTasksSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);

	constructor(private api: HttpService) {

	}

	public foodTasksById(userId: number) {
		this.loadFoodTasksById(userId);
		return this.foodTasksSubject.asObservable();
	}

	public deliveryTasksById(userId: number) {
		this.loadDeliveryTasksById(userId);
		return this.deliveryTasksSubject.asObservable();
	}

	public get foodTasks() { 
		this.loadFoodTasks();
		return this.foodTasksSubject.asObservable(); 
	}

	public get foodOrders() { 
		this.loadFoodOrders();
		return this.foodOrdersSubject.asObservable(); 
	}

	public getAsyncWhere(options) {
		return this.api
		.getData(options.data+ '?' +'param_name='+options.dep+ '&' +'value='+options.value+ '&' +'param=true');
	}

	loadFoodTasks() {
		this.getIt('food_tasks')
			.subscribe((data: FoodTask[]) => {
				console.log(data);
				this.foodTasksSubject.next(data);
			});
	}

	loadFoodTasksById(userId: number) {
		this.getAsyncWhere({
			'data': 'food_tasks_where',
			'dep': 'chiefId',
			'value': userId
		})
		.subscribe((data: FoodTask[]) => {
			this.foodTasksSubject.next(data)
		});
	}

	loadDeliveryTasksById(userId: number) {
		this.getAsyncWhere({
			'data': 'delivery_tasks_where',
			'dep': 'deliveryManId',
			'value': userId
		})
		.subscribe((data: any) => {
			this.deliveryTasksSubject.next(data)
		});
	}

	loadFoodOrders() {
		this.getIt('food_orders')
			.subscribe((data: any) => {
				console.log(data);
				this.foodOrdersSubject.next(data);
			});
	}

	getIt(somestring: string): Observable<any> {
    return this.api.getData(somestring);
  }

  getItWhere(somestring: string, param: string, somevalue: any) {
    return new Promise((resolve, reject) => {
      this.api.getData(somestring+ '?' +'param_name='+param+ '&' +'value='+somevalue+ '&' +'param=true')
        .subscribe(
          data => resolve(data),
          error => reject(null)
        )
    });
  }


}

