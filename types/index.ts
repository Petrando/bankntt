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

interface termFeatureI {
    name:string;
    features:string[];
}

export interface savingI {
	_id?:any;
    name?:string;
    photo?:any;
	photoDimension?:{
		width:number,height:number
	};
    displayPhoto?:string;
    about?:string;
    termsFeatures?:termFeatureI[];
}