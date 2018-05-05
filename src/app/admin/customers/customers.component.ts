import { Component, OnInit } from '@angular/core';
import { DataService } from '../../common/services/data.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ICustomer } from '../../common/interfaces/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

	displayedColumns = ['id', 'name', 'mobileNumber', 'address', 'area', 'email' ];
	customerData: ICustomer[];
	dataSource = new MatTableDataSource<ICustomer>(this.customerData);

  constructor(private data: DataService) { 
  	this.data.getCustomers()
  		.subscribe(
  			data => {
  				this.customerData = data;
  				console.log(this.customerData);
  				let arr = [];
  				data.forEach(function(element) {
  					arr.push(element.values);
  				});
  				console.log(arr);	
  				var obj = data.reduce(function(acc, cur, i) {
  					acc[i] = cur;
  					return acc;
					}, {});
  				console.log(obj);
  			}
  		);
  }

  ngOnInit() {

  }
}
