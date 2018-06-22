import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable, pipe, from } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { DataService } from '../../common/services/data.service';
import { SessionService } from '../../common/services/session.service';
import { TaskService } from '../../common/services/task.service';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

	columns = [
    { columnDef: 'id', header: 'ID', cell: (data: any) => `${data.id}` },
    { columnDef: 'customerAddress', header: 'ADDRESS', cell: (data: any) => `${data.address}` },
    { columnDef: 'customerArea', header: 'AREA', cell: (data: any) => `${data.area}` },
    { columnDef: 'customerMobile', header: 'MOBILE', cell: (data: any) => `${data.mobileNumber}` },
    { columnDef: 'customerName', header: 'NAME', cell: (data: any) => `${data.customerName}` },
    { columnDef: 'saladName', header: 'SALAD NAME', cell: (data: any) => `${data.saladName}` },
    { columnDef: 'timing', header: 'TIMING', cell: (data: any) => this.getProperTiming(data) },
    { columnDef: 'status', header: 'STATUS', cell: (data: any) => `${data.taskStatus}` }
  ];
  actionColumn = { columnDef: 'action', header: 'ACTION', cell: (data: any) => `${data.id}` };
  displayedColumns = this.columns.map(c => c.columnDef);
  deliveryTasksDataSource: DeliveryTasksDataSource;

  constructor(private data: DataService, private session: SessionService, private task: TaskService) { 
  	this.displayedColumns = this.displayedColumns.concat('action');
  }

  ngOnInit() {
  	let roleId = this.session.userRoleId;
    roleId == 3 ? this.loadDeliveryTasks() : this.loadDeliveryOrders();
  }

  loadDeliveryOrders() {
  	
  }

  loadDeliveryTasks() {
  	this.deliveryTasksDataSource = new DeliveryTasksDataSource(this.data, this.session);
  }

  getProperTiming(data: any) {
  	if (data.timeSlot == "Morning") {
  		return data.morningTimeSlot;
  	} else if (data.timeSlot == "Evening") {
  		return data.eveningTimeSlot;
  	} else {
  		let time = new Date();
  		return (time.getHours() < 13) ? data.morningTimeSlot : data.eveningTimeSlot;
  	}
  }

  setStatusComplete(taskId: number) {
  	this.task.setStatus({ taskId: taskId, statusId: 3 }).subscribe(data => {
  		(data.result == true) ? this.loadDeliveryTasks() : console.log(data);
  	})
  }
}

export class DeliveryTasksDataSource implements DataSource<any> {

  private dataSource: Observable<any>;

  constructor(private data: DataService, private session: SessionService) {
    
  }

  connect(collectionViewer: CollectionViewer): Observable<any> {
    return this.data.deliveryTasksById(this.session.userId)
  	.pipe(
  		map((data) => {
  			let time = new Date();
  			data = data.filter((x) => {
  				return (time.getHours() > 13) ? (x.timeSlot == "Evening") : (x.timeSlot == "Morning");
  			});
  			data = data.map((x) => {
  				x['customerName'] = x.firstname + " " + x.lastname;
  				delete(x['firstname']);
  				delete(x['lastname']);
  				return x;
  			});
  			return data;
  		})
  	);
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.data.deliveryTasksSubject.complete();
  }

}