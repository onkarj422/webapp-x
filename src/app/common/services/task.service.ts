import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { HttpService } from './http.service';
import { Observable, Subject, pipe } from 'rxjs';
import { tap, map, first, pluck } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable()
export class TaskService {

	constructor(public api: HttpService, public data: DataService) {
		
	}

	public setStatus(data:{ taskId: number, statusId: number }) {
		return this.api.post(data, 'set_status');
	}

	public runTaskJob() {
		this.api.getData('order_task_job').subscribe(data => {
			console.log(data);
		});
	}

}