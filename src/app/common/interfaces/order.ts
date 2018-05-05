import { ICustomer } from './customer';
import { IMealPlans } from './meal';
import { IDelivery } from './delivery';

export interface IOrder {
	id: number;
	date: string;
	customer: ICustomer;
	mealPlan: IMealPlans;
	delivery: IDelivery;
	status: string;
}