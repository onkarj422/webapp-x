import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { AppCommonModule } from '../common/common.module';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { FoodComponent } from './food/food.component';
import { DeliveryComponent } from './delivery/delivery.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppCommonModule
  ],
  declarations: [DashboardComponent, CustomersComponent, OrdersComponent, AddOrdersComponent, FoodComponent, DeliveryComponent]
})
export class AdminModule { }
