import { useReducer, useEffect } from "react";
import fetchJson from "../../../lib/fetchJson";
import SavingForm from "../components/TabunganForm";
import { savingFormI, savingActionI } from "../../../types";

const SavingFormState:savingFormI = {
    saving : {
        name:"",
        photo:null,
        photoDimension:{width:0, height:0},
        displayPhoto:null,
        about:"",
        termsFeatures:[
            {
                name:"Prasyarat",
                features:[]
            },
            {
                name:"Syarat Khusus",
                features:[]
            },
            {
                name:"Fasilitas",
                features:[]
            },
            {
                name:"Keuntungan",
                features:[]
            }
        ]
    },
    checkboxStates:{
        Prasyarat:false,
        "Syarat Khusus":false,
        Fasilitas:false,
        Keuntungan:false
    },
    loading:false
}

const SavingReducer = (state:savingFormI, action:savingActionI):savingFormI => {
    let updatedState = Object.assign({}, state);

    switch (action.type){
        case "CHANGE_NAME":
            updatedState.saving.name = action.name;
            return updatedState;
        case "SET_PHOTO":
            const {photo, displayPhoto} = action;
            updatedState.saving.photo = action.photo;
            updatedState.saving.displayPhoto = displayPhoto;
            return updatedState;   
        case "SET_PHOTO_DIMENSION":
            const {photoWidth, photoHeight} = action;
            updatedState.saving.photoDimension.width = photoWidth;
            updatedState.saving.photoDimension.height = photoHeight;
            return updatedState;
        case "CHANGE_ABOUT":
            updatedState.saving.about = action.about;
            return updatedState;
        case "ADD_TERM_OR_FEATURE": {
            const {featureName, feature} = action;
            const idxToUpdate = updatedState.saving.termsFeatures.findIndex(d => d.name===featureName);
            updatedState.saving.termsFeatures[idxToUpdate].features.push(feature);
            return updatedState;
        }             
        case "EDIT_TERM_OR_FEATURE": {
            const {featureName, feature, featureIdx} = action;
            const idxToUpdate = updatedState.saving.termsFeatures.findIndex(d => d.name===featureName);
            updatedState.saving.termsFeatures[idxToUpdate].features[featureIdx] = feature;
            return updatedState;
        }
        case "DELETE_TERM_OR_FEATURE": {
            const {featureName, featureIdx} = action;
            const idxToUpdate = updatedState.saving.termsFeatures.findIndex(d => d.name===featureName);
            let updatedFeatures = updatedState.saving.termsFeatures[idxToUpdate].features.slice();
            updatedFeatures = updatedFeatures.filter((d, i)=>i!==featureIdx);
            updatedState.saving.termsFeatures[idxToUpdate].features = updatedFeatures;
            return updatedState;
        }
        case "TOGGLE_CHECKBOX":            
            const {featureCheck, newState} = action;            
            updatedState.checkboxStates[featureCheck] = newState;
            return updatedState;
        case "TOGGLE_LOADING":
            updatedState.loading = !updatedState.loading;
            return updatedState;
        case "RESET_SAVING_DATA":
            updatedState = SavingFormState;
            return updatedState;
        default:
            return state;
    }
}

const AddNewSaving = ({closeAdding}:{closeAdding:()=>void}) => {
    const [formState, dispatch] = useReducer(SavingReducer, SavingFormState);

    useEffect(()=>{
        console.log("new instance.")
        dispatch({type:"RESET_SAVING_DATA"});
    }, [])

    const getMyFeatures = (featureLabel: string):string[] => {
        const featureIdx = formState.saving.termsFeatures.findIndex((d)=>d.name===featureLabel);
        return formState.saving.termsFeatures[featureIdx].features;
    }

    const mayNotSave = () => {
        return formState.saving.name === "" || formState.saving.photo === null || formState.saving.about === "";
    }

    const createFormData = () => {
        const formData = new FormData();
        const {name, photo, about, photoDimension} = formState.saving;
        formData.append("name", name);
        formData.append("photo", photo);
        formData.append("photoDimension", JSON.stringify(photoDimension));
        formData.append("about", about);
        
        //append termsFeatures only when checkbox is checked and features has content : length > 0
        const termsFeatures = formState.saving.termsFeatures.filter(d=>formState.checkboxStates[d.name] && d.features.length > 0);
        formData.append("termsFeatures", JSON.stringify(termsFeatures));
        
        return formData;
    }

    const saveData = async () => {
        dispatch({type:"TOGGLE_LOADING"});
        const formData = createFormData();
    
        try {
			const saveResult = await fetchJson("/api/dana/tabungan/addSaving", {
			  method: "POST",
			  //headers: { "Content-Type": "application/json" },
              headers: {
                Accept: 'application/json'
              },
			  body: formData
			});
			
            console.log(saveResult);
			if(saveResult.message==="success"){
				closeAdding();
			}else{
                dispatch({type:"TOGGLE_LOADING"});
			}
			
		  } catch (error) {
			console.error("An unexpected error happened:", error);
            dispatch({type:"TOGGLE_LOADING"});
		  }
    }

    return (
        <SavingForm
            formState={formState}
            dispatch={dispatch}
            saveData={()=>{saveData()}}
            mayNotSave={()=>mayNotSave()}
            closeForm={()=>{closeAdding()}}
        />
    )
}

export default AddNewSaving;