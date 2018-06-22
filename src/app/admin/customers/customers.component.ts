import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../common/services/data.service';
import { map } from 'rxjs/operators';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ICustomers } from '../../common/interfaces/customers';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

	displayedColumns = ['id', 'name', 'mobileNumber', 'address', 'area', 'email'];
	dataSource;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private data: DataService) { 
  	
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.data.getIt('customers')
      .subscribe(
        data => {
          this.dataSource = data as ICustomers;
          this.dataSource = new MatTableDataSource<ICustomers>(data);
          this.dataSource.sort = this.sort;
        }
      );
  }
}
