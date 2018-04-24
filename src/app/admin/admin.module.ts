import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { AppCommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppCommonModule
  ],
  declarations: [DashboardComponent, CustomersComponent, OrdersComponent]
})
export class AdminModule { }
