interface RateI {
	range:string;
	rate:string;
}

export interface TableCardI {
	_id?:string;
	title: string;
	rates: RateI[];
	firstColumnTitle: string;
	setEdited?:()=>void;
	updateInterestData?:()=>void;
}