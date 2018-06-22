import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { FoodComponent } from './food/food.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AuthGuard } from '../common/services/auth-guard.service';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{ path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
			{	path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
			{ path: 'food', component: FoodComponent, canActivate: [AuthGuard] },
			{ path: 'delivery', component: DeliveryComponent, canActivate: [AuthGuard] }
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
