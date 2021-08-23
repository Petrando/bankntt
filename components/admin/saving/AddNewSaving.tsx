import { useReducer, useEffect } from "react";
import fetchJson from "../../../lib/fetchJson";
import SavingForm from "../components/TabunganForm";
import { SavingFormState, SavingReducer } from "./reducer/SavingStateNReducer";

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