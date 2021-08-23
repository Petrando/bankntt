interface RateI {
	range:string;
	rate:string;
}

export interface interestI {
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

interface checkboxStatesI {
    Prasyarat:boolean;
    "Syarat Khusus":boolean;
    Fasilitas:boolean;
    Keuntungan:boolean;
}

export interface savingFormI {
    saving: savingI;
    checkboxStates:checkboxStatesI;
    loading:boolean;
}

export interface savingActionI {
    type:string;
    name?:string;
    photoWidth?:number;
    photoHeight?:number;
    photo?:any;
    displayPhoto?:any;
    about?:string;
    featureName?:string;
    feature?:string;
    featureIdx?:number;
    featureCheck?:string;
    newState?:boolean;
}