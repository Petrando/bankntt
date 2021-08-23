import { Fragment, useState, useEffect, useRef, useReducer, Dispatch } from "react";
import useSWR from 'swr';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import BlockIcon from '@material-ui/icons/Block';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import fetcher from "../../../lib/fetcher";
import fetchJson from "../../../lib/fetchJson";
import {savingI} from "../../../types";
import Layout from "../../../components/admin/layout";
import Header from "../../../components/admin/components/header";
import ModalLayout from "../../../components/globals/ModalLayout";
import SavingForm from "../../../components/admin/components/TabunganForm";
import GridElement from "../../../components/admin/components/TabunganInGrid";
import { savingFormI, savingActionI } from "../../../types";
import dialogStyles from "../../../styles/admin/ProductDialog.module.css";

const Savings = () => {
    const { data, mutate, error } = useSWR('/api/dana/tabungan/tabunganList', fetcher);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [idEdit, setEditId] = useState<string>("");
    const [idToDelete, setDeleteId] = useState<string>("");

    useEffect(()=>{
        console.log(data);
    }, [data])

    return (
        <Layout>
            <Header title={"Galeri Tabungan"} addNew={()=>{setIsAdding(true)}} />
            <div className={"container"}>
                {
                    !data &&
                    <p>loading</p>
                }
                {
                    data &&
                    <div className={`${"imageGallery"} ${"margins"}`}>
                        {
                            data.map(d => <GridElement 
                                            key={d._id}
                                            data={d} 
                                            setEdit={(id)=>{setEditId(id)}}
                                            setDelete={(id)=>{setDeleteId(id)}}   
                                         />)
                        }
					</div>
                }
            </div>
            {
                isAdding &&
                <ModalLayout closeModal={()=>{setIsAdding(false)}}>
                    <AddNewSaving closeAdding={()=>{setIsAdding(false)}}/>

                </ModalLayout>
            }
            {
                idEdit !== "" &&
                <ModalLayout closeModal={()=>{setEditId("")}}>
                    <div className={"dialog"}>
                        <h4>Edit Tabungan</h4>
                    </div>

                </ModalLayout>
            }
            {
                idToDelete !== "" &&
                <ModalLayout closeModal={()=>{setDeleteId("")}}>
                    <div className={"dialog"}>
                        <h4>Hapus Tabungan</h4>
                    </div>

                </ModalLayout>
            }
            <style jsx>{`
                .container {
                    width:100%;
                    min-height:calc(100vh - 150px);
                    background-color:lightsteelblue;
                    display:flex;justify-content:center;align-items:center;flex-wrap:wrap;
                }
                .margins {
                    margin-top:15px;
                    margin-bottom: 60px;
                }
            `}</style>
        </Layout>        
    )
}

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

const CheckElement = ({label, dispatch, checkState}:{label:string, dispatch:Dispatch<savingActionI>, checkState:boolean}) => {
    return (
        <span className={"flexRowStart"}>
            <input type={"checkbox"} id={label} name={label} value={label} 
                checked={checkState}
                onChange={()=>{dispatch({type:"TOGGLE_CHECKBOX", featureCheck:label, newState:!checkState})}}
            />
            <label  htmlFor={label}>{label}</label>
        </span>
    )
}

const AddFeatures = ({title, dispatch, features}:{title:string, dispatch:Dispatch<savingActionI>, features:string[]}) => {
    //const [features, setFeatures] = useState<string[]>([]);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [idxEdited, setEditedIdx] = useState<number>(-1);

    const addEditFeature = (feature) => {
        let updatedFeatures = features.slice();
        if(isAdding){
            dispatch({type:"ADD_TERM_OR_FEATURE", featureName:title, feature})
        }else if(idxEdited > -1){
            //updatedFeatures[idxEdited] = feature;
            dispatch({type:"EDIT_TERM_OR_FEATURE", featureName:title, feature, featureIdx:idxEdited});
        }
        //setFeatures(updatedFeatures);
        setIsAdding(false);
        setEditedIdx(-1);
    }

    const deleteFeature = (idx) => {
        //const updatedFeatures = features.slice().filter((d, i)=>i!==idx);
        //setFeatures(updatedFeatures);
        dispatch({type:"DELETE_TERM_OR_FEATURE", featureName:title, featureIdx:idx});
    }

    const buttonActive = idxEdited === -1 && !isAdding;

    const feature = (d, i) => {
        const iAmEdited = i===idxEdited;
        return (
            <Fragment key={i}> 
            {
                !iAmEdited?
                <div className={`${"width100"} ${"centerRowFlex"}`}>
                    <p className={`${"flex09"}`}>
                        {d}
                    </p>
                    <div className={`${"centerRowFlex"} ${"flex01"}`}>
                        <EditIcon className={`${buttonActive?"spanButton":"inactiveButton"}`} 
                            onClick={()=>{setEditedIdx(i)}}
                        />
                        <DeleteIcon className={`${buttonActive?"cancelButton":"inactiveButton"}`} 
                            onClick={()=>{deleteFeature(i)}}
                        />
                    </div>
                </div>:
                <AddEditFeature 
                    feature={d}
                    addEditFeature={(feature)=>{addEditFeature(feature)}} 
                    cancel={()=>{
                                setIsAdding(false);
                                setEditedIdx(-1);
                            }}
                /> 
            }
            </Fragment>
        )
    }

    return (
        <div className={"width100"}>
            <Header isMedium={true} title={title} addNew={()=>{setIsAdding(true)}} mayAdd={buttonActive} />
            {
                isAdding &&
                <div style={{margin:"5px 0px"}}>
                    <AddEditFeature feature={""} 
                        addEditFeature={(feature)=>{addEditFeature(feature)}} 
                        cancel={()=>{
                                        setIsAdding(false);
                                        setEditedIdx(-1);
                                }} 
                    />
                </div>
            }
            {
                features.length > 0 &&
                features.map(feature)
            }
        </div>
    )
}

const AddEditFeature = ({feature, addEditFeature, cancel}:{feature:string, 
                                                          addEditFeature:(feature:string)=>void, 
                                                          cancel:()=>void}) => {
    const [myFeature, setMyFeature] = useState<string>("");

    const myRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        setMyFeature(feature);
        myRef.current.focus();
    }, []);

    return (
        <form className={`${"width100"} ${"centerRowFlex"}`}>
            <input type="text" className={`${"input"} ${"flex09"}`} ref={myRef}
                value={myFeature}
                onChange={(e)=>{setMyFeature(e.target.value)}}
            />
            <div className={`${"centerRowFlex"} ${"flex01"}`}>
                <button type={"submit"} className={"invisibleBtn"}
                    onClick={(e)=>{
                        e.stopPropagation();
                        e.preventDefault();
                        if(myFeature!==""){
                            addEditFeature(myFeature);
                        }
                    }}
                >
                    <CheckCircleIcon 
                        className={`${myFeature!==""&&"okButton"} ${myFeature===""&&"inactiveButton"}`} 
                    />
                </button>
                <button className={"invisibleBtn"} 
                    onClick={()=>{cancel()}}
                >
                    <CancelIcon className={"cancelButton"} />
                </button>
            </div>
            <style jsx>{`
                .invisibleBtn {
                    margin:0px;
                    padding:0px;
                    width:auto;
                    height:auto;
                    border:0px solid transparent;
                }
            `}</style>
        </form>
    )
}
export default Savings;