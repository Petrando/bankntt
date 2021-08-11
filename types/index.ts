interface RateI {
	range:string;
	rate:string;
}

export interface TableCardI {
	title: string;
	rates: RateI[];
	firstColumnTitle: string;
	setEdited?:()=>void;
}