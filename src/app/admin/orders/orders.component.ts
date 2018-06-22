import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Subject ,  Observable, pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { DataService } from '../../common/services/data.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { OrderService } from '../../common/services/order.service';
import { TaskService } from '../../common/services/task.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  addFab: boolean = false;

	orderDataColumns = ['id', 'date', 'mealName', 'mealSize', 'foodType', 'status', 'payment', 'customerId'];
  orderDataSource;

  constructor(private data: DataService, private order: OrderService, private task: TaskService) {
    
  }

  loadData() {
    this.data.getIt('orders')
      .pipe(
        map(data => this.mapOrderData(data))
      )
      .subscribe(data => {
        this.orderDataSource = new MatTableDataSource<any>(data);
      });
    this.order.updateOrders.next(false);
  } 

  mapOrderData(data: any) {
    for (var i in data) {
      data[i].date = this.order.formatDate(data[i].date);
    }
    return data;
  }

  deliveryView(id) {
    this.data.getItWhere('o_deliveries', 'id' , id).then(data => {
      console.log(data);
    });
  }

  ngOnInit() {
    this.loadData();
    this.order.updateOrders.asObservable().subscribe(data => {
      if (data == true) {
        this.loadData();
      }
    });
  }

  ngAfterViewInit() {

  }
}
