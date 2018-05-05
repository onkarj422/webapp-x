import { IAddress } from './address';

export interface ICustomer {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	password?: string;
	mobileNumber: number;
	addresses: IAddress[];
	height?: string;
	weight?: string;
	need?: string;
	age?: number;
	gender?: string;
}
