export interface FoodTask {
	id: number;
	orderId?: number;
	taskStatus: string;
	saladName: string;
	foodType: string;
	mealSize: string;
}

export interface FoodTasks extends Array<FoodTask> {
	
}