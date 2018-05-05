import { ISalad } from './salad';
import { IDeliveryMan } from './deliveryman';
import { IChief } from './chief';

export interface IDayTask {
	dayTime: string;
	daySalad: ISalad;
	deliveryMan: IDeliveryMan;
	chief: IChief;
}