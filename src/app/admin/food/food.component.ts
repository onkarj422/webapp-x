import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Observable, pipe, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { DataService } from '../../common/services/data.service';
import { TaskService } from '../../common/services/task.service';
import { SessionService } from '../../common/services/session.service';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { FoodTasks, FoodTask } from '../../common/interfaces/food-task';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  columns = [
    { columnDef: 'id', header: 'ID', cell: (data: FoodTask) => `${data.id}` },
    { columnDef: 'saladName', header: 'SALAD', cell: (data: FoodTask) => `${data.saladName}` },
    { columnDef: 'mealSize', header: 'MEAL SIZE', cell: (data: FoodTask) => `${data.mealSize}` },
    { columnDef: 'foodType', header: 'VEG/NON-VEG', cell: (data: FoodTask) => `${data.foodType}` },
    { columnDef: 'status', header: 'STATUS', cell: (data: FoodTask) => `${data.taskStatus}` }
  ];
  actionColumn = { columnDef: 'action', header: 'ACTION', cell: (data: FoodTask) => `${data.id}` };
  displayedColumns = this.columns.map(c => c.columnDef);
  foodTasksDataSource: FoodTasksDataSource;
  foodOrdersDataSource: FoodOrdersDataSource;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private data: DataService, private session: SessionService, private task: TaskService) { 
    this.displayedColumns = this.displayedColumns.concat('action');
  }

  applyFilter(filterValue: string) {
    /*filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.foodOrderDataSource.filter = filterValue;*/
  }

  loadFoodTasks() {
    this.foodTasksDataSource = new FoodTasksDataSource(this.data, this.session);
  }

  loadFoodOrders() {
    this.foodOrdersDataSource = new FoodOrdersDataSource(this.data);
  }

  setStatusComplete(id) {
    this.task.setStatus({ taskId: id, statusId: 2 }).subscribe(data => {
      (data.result == true) ? this.loadFoodTasks() : console.log(data);
    });
  }

  ngOnInit() {
    let roleId = this.session.userRoleId;
    roleId == 4 ? this.loadFoodTasks() : this.loadFoodTasks();
  }
}

export class FoodTasksDataSource implements DataSource<FoodTask> {

  private dataSource: Observable<FoodTask[]>;

  constructor(private data: DataService, private session: SessionService) {
    
  }

  connect(collectionViewer: CollectionViewer): Observable<FoodTask[]> {
    return this.data.foodTasksById(this.session.userId);
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.data.foodTasksSubject.complete();
  }

}

export class FoodOrdersDataSource implements DataSource<any> {

  private dataSource: Observable<any>;

  constructor(private data: DataService) {
    
  }

  connect(collectionViewer: CollectionViewer): Observable<any> {
    return this.data.foodOrders;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.data.foodOrdersSubject.complete();
  }

}