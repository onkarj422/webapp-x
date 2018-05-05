import { IDayTask } from './daytask';

export interface IDelivery {
	deliveryCount: number;
	preferredTime: string;
	preferredVeg: string;
	dayTask: IDayTask;
}