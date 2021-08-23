import { useReducer, useEffect } from "react";
import fetchJson from "../../../lib/fetchJson";
import SavingForm from "../components/TabunganForm";
import { SavingFormState, SavingReducer } from "./reducer/SavingStateNReducer";
import { savingI } from "../../../types";

const EditSaving = ({closeForm, editedData}:{closeForm:()=>void, editedData:savingI}) => {
    const [formState, dispatch] = useReducer(SavingReducer, SavingFormState);

    useEffect(()=>{   
        dispatch({type:"INIT_EDITED_DATA", editedSaving:editedData});
    }, [])

    const mayNotSave =  formState.saving.name === "" || formState.saving.about === "";

    const createFormData = () => {
        const formData = new FormData();
        const {name, photo, about, photoDimension} = formState.saving;
        formData.append("id", editedData._id);
        formData.append("name", name);
        if(photo!==null) {
            formData.append("photo", photo);
            formData.append("photoDimension", JSON.stringify(photoDimension));
        }

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
			const updateResult = await fetchJson("/api/dana/tabungan/updateSavingData", {
			  method: "POST",
			  //headers: { "Content-Type": "application/json" },
              headers: {
                Accept: 'application/json'
              },
			  body: formData
			});
			
            console.log(updateResult);
			if(updateResult.message==="success"){
				closeForm();
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
            editedPhotoSrc={`data:${editedData.photo["Content-Type"]};base64, ${editedData.photo["data"]}`}
            formState={formState}
            dispatch={dispatch}
            saveData={()=>{saveData()}}
            mayNotSave={()=>mayNotSave}
            closeForm={()=>{closeForm()}}
            resetForm={()=>{dispatch({type:"INIT_EDITED_DATA", editedSaving:editedData});}}
        />
    )
}

export default EditSaving;