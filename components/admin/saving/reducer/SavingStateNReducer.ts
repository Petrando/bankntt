import { savingFormI, savingActionI, termFeatureI } from "../../../../types";

export const SavingFormState:savingFormI = {
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

export const SavingReducer = (state:savingFormI, action:savingActionI):savingFormI => {
    let updatedState = Object.assign({}, state);

    switch (action.type){
        case "INIT_EDITED_DATA":{
            const {name, about, termsFeatures} = action.editedSaving;
            updatedState.saving.name = name;
            updatedState.saving.about = about;
            updatedState.saving.photo = null;
            updatedState.saving.photoDimension.width = 0; 
            updatedState.saving.photoDimension.height = 0;
            updatedState.saving.displayPhoto = null;

            updatedState.saving.termsFeatures.map(d=>{
                const featuresIdx = termsFeatures.findIndex(df=>{
                    return df.name===d.name
                });

                const featuresExisted = featuresIdx > -1;

                if(featuresExisted){
                    d.features = termsFeatures[featuresIdx].features.slice();
                    updatedState.checkboxStates[d.name] = true;
                }else {
                    d.features = [];
                    updatedState.checkboxStates[d.name] = false;
                }
            })

            return updatedState;            
        }
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
            updatedState.saving.name = "";
            updatedState.saving.about = "";
            updatedState.saving.photo = null;
            updatedState.saving.photoDimension.width = 0; 
            updatedState.saving.photoDimension.height = 0;
            updatedState.saving.displayPhoto = null;

            updatedState.saving.termsFeatures = [
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
    
            updatedState.checkboxStates = {
                Prasyarat:false,
                "Syarat Khusus":false,
                Fasilitas:false,
                Keuntungan:false
            }

            return updatedState;
        default:
            return state;
    }
}