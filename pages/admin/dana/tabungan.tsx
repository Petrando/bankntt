import { Fragment, useState, useEffect, useRef, useReducer, Dispatch } from "react";
import useSWR from 'swr';
import imageCompression from 'browser-image-compression';
import fetcher from "../../../lib/fetcher";
import Layout from "../../../components/admin/layout";
import Header from "../../../components/admin/components/header";
import ModalLayout from "../../../components/globals/ModalLayout";
import dialogStyles from "../../../styles/admin/ProductDialog.module.css";
import fetchJson from "../../../lib/fetchJson";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import BlockIcon from '@material-ui/icons/Block';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { close } from "node:inspector";

const Savings = () => {
    const { data, mutate, error } = useSWR('/api/dana/tabungan/tabunganList', fetcher);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [idxEdit, setEditIdx] = useState<number>(-1);

    useEffect(()=>{
        console.log(data);
    }, [data])

    return (
        <Layout>
            <Header title={"Galeri Tabungan "} addNew={()=>{setIsAdding(true)}} />
            <div className={"container"}>
                {
                    !data &&
                    <p>loading</p>
                }
            </div>
            {
                isAdding &&
                <ModalLayout closeModal={()=>{setIsAdding(false)}}>
                    <AddNewSaving closeAdding={()=>{setIsAdding(false)}}/>

                </ModalLayout>
            }
            {
                idxEdit !== -1 &&
                <ModalLayout closeModal={()=>{setEditIdx(-1)}}>
                    <div className={"dialog"}>
                        <h4>Edit Tabungan</h4>
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

            `}</style>
        </Layout>        
    )
}

interface termFeatureI {
    name:string;
    features:string[];
}

interface savingI {
    name:string;
    photo:string;
    displayPhoto:string;
    about:string;
    "terms & features":termFeatureI[];
}

interface checkboxStatesI {
    Prasyarat:boolean;
    "Syarat Khusus":boolean;
    Fasilitas:boolean;
    Keuntungan:boolean;
}

interface SavingFormI {
    saving: savingI;
    checkboxStates:checkboxStatesI;
    loading:boolean;
}

interface actionI {
    type:string;
    name?:string;
    photo?:any;
    displayPhoto?:any;
    about?:string;
    featureName?:string;
    feature?:string;
    featureIdx?:number;
    featureCheck?:string;
    newState?:boolean;
}

const SavingFormState:SavingFormI = {
    saving : {
        name:"",
        photo:null,
        displayPhoto:null,
        about:"",
        "terms & features":[
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

const SavingReducer = (state:SavingFormI, action:actionI):SavingFormI => {
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
        case "CHANGE_ABOUT":
            updatedState.saving.about = action.about;
            return updatedState;
        case "ADD_TERM_OR_FEATURE": {
            const {featureName, feature} = action;
            const idxToUpdate = updatedState.saving["terms & features"].findIndex(d => d.name===featureName);
            updatedState.saving["terms & features"][idxToUpdate].features.push(feature);
            return updatedState;
        }             
        case "EDIT_TERM_OR_FEATURE": {
            const {featureName, feature, featureIdx} = action;
            const idxToUpdate = updatedState.saving["terms & features"].findIndex(d => d.name===featureName);
            updatedState.saving["terms & features"][idxToUpdate].features[featureIdx] = feature;
            return updatedState;
        }
        case "DELETE_TERM_OR_FEATURE": {
            const {featureName, featureIdx} = action;
            const idxToUpdate = updatedState.saving["terms & features"].findIndex(d => d.name===featureName);
            let updatedFeatures = updatedState.saving["terms & features"][idxToUpdate].features.slice();
            updatedFeatures = updatedFeatures.filter((d, i)=>i!==featureIdx);
            updatedState.saving["terms & features"][idxToUpdate].features = updatedFeatures;
            return updatedState;
        }
        case "TOGGLE_CHECKBOX":            
            const {featureCheck, newState} = action;            
            updatedState.checkboxStates[featureCheck] = newState;
            return updatedState;
        case "TOGGLE_LOADING":
            updatedState.loading = !updatedState.loading;
            return updatedState;
        default:
            return state;
    }
}

const AddNewSaving = ({closeAdding}:{closeAdding:()=>void}) => {
    const [formState, dispatch] = useReducer(SavingReducer, SavingFormState);

    const getMyFeatures = (featureLabel) => {
        const featureIdx = formState.saving["terms & features"].findIndex((d)=>d.name===featureLabel);
        return formState.saving["terms & features"][featureIdx].features;
    }

    const mayNotSave = () => {
        return formState.saving.name === "" || formState.saving.photo === null || formState.saving.about === "";
    }

    const createFormData = () => {
        const formData = new FormData();
        const {name, photo, about} = formState.saving;
        formData.append("name", name);
        formData.append("photo", photo);
        formData.append("about", about);
        
        //append termsFeatures only when checkbox is checked and features has content : length > 0
        const termsFeatures = formState.saving["terms & features"].filter(d=>formState.checkboxStates[d.name] && d.features.length > 0);
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
        <div className={dialogStyles.dialog}
            onClick={(e)=>{
                e.stopPropagation();
            }}
        >
            <div className={dialogStyles.dialogContent}>
            <h4 className={`${"dialogTitle"} ${"width100"}`}>
                {!formState.loading?"Jenis Tabungan Baru":"Menyimpan Data...."}
            </h4>
            <label htmlFor="namaTabungan" className={`${"label"} ${"width100"}`}>Nama Tabungan</label>
            <input type="text" className={`${"input"} ${"width100"}`} id="namaTabungan" name="namaTabungan" 
                value={formState.saving.name}
                onChange={(e)=>{
                    dispatch({type:"CHANGE_NAME", name:e.target.value});
                }}
                disabled={formState.loading}
            />
            <div className={`${"width100"} ${"photoAndAbout"}`} >
                <div className={`${"photoContainer"}`}>
                    {
                        formState.saving.displayPhoto!==null && 
                        <img src={formState.saving.displayPhoto} style={{width:"100%", height:"100%"}} />
                    }
                    <span className={`${"buttonWrap"} ${"centerRowFlex"}`}>
                        <label htmlFor="fotoTabungan" className={`${"photoButton"} ${"centerRowFlex"}`}>
                            <CameraAltIcon style={{marginLeft:"3px"}}/>
                            Foto
                        </label>
                        <input type="file" className={`${"input"} ${"width100"} ${"photoAndAboutHeight"}`} id="fotoTabungan" 
                            onChange={(e)=>{
                                const photoFile = e.target.files[0];
                                if(!photoFile){
                                    console.log("no files");
                                    return;
                                }else {
                                    dispatch({type:"SET_PHOTO", photo:photoFile, displayPhoto:URL.createObjectURL(photoFile)});
                                }
                            }}
                            disabled={formState.loading}
                        />    
                    </span>                    
                </div>
                <div className={"aboutContainer"}>
                    <label htmlFor="about" className={`${"label"} ${"width100"}`}>Uraian</label>
                    <input type="text-area" 
                        className={`${"input"} ${"width100"} ${"photoAndAboutHeight"} ${"about"}`} 
                        id="about" name="about" 
                        value={formState.saving.about}
                        onChange={(e)=>{
                            dispatch({type:"CHANGE_ABOUT", about:e.target.value});
                        }}
                        disabled={formState.loading}
                    />
                </div>
            </div>
            <fieldset className={`${"width100"} ${"marginTop"} ${"spaceAroundFlex"}`}>
                <legend style={{fontSize:"14px"}}>Syarat & Fitur</legend>
                {
                    ["Prasyarat", "Syarat Khusus", "Fasilitas", "Keuntungan"].map((d, i)=><CheckElement key={i} 
                                                                                                    label={d} 
                                                                                                    dispatch={dispatch} 
                                                                                                    checkState={formState.checkboxStates[d]}
                                                                                                    />)
                }
            </fieldset>  
            {
                formState.checkboxStates.Prasyarat &&
                <AddFeatures 
                    title={"Prasyarat"}
                    dispatch={dispatch}
                    features={getMyFeatures("Prasyarat")}
                />       
            }
            {
                formState.checkboxStates["Syarat Khusus"] &&
                <AddFeatures 
                    title={"Syarat Khusus"}
                    dispatch={dispatch}
                    features={getMyFeatures("Syarat Khusus")}
                />       
            }
            {
                formState.checkboxStates.Fasilitas &&
                <AddFeatures 
                    title={"Fasilitas"}
                    dispatch={dispatch}
                    features={getMyFeatures("Fasilitas")}
                />       
            }   
            {
                formState.checkboxStates.Keuntungan &&
                <AddFeatures 
                    title={"Keuntungan"}
                    dispatch={dispatch}
                    features={getMyFeatures("Keuntungan")}
                />       
            }
            </div>
            <div className={dialogStyles.dialogFooter}>
                <span className={`${"saveCancelButton"} ${"saveButton"} ${(mayNotSave() || formState.loading) && "inactiveButton"}`}
                    onClick={()=>{saveData()}}                    
                >
                    <SaveIcon fontSize={"large"} />    
                    <span className={"btnLabel"}>
                        Simpan
                    </span>
                </span>                
                <span className={`${"saveCancelButton"} ${"cancelButton"} ${formState.loading && "inactiveButton"}`}
                    onClick={()=>{closeAdding()}}
                >
                    <CancelIcon fontSize={"large"} />
                    <span className={"btnLabel"}>
                        Batal
                    </span>
                </span>                
            </div>
            <style jsx>
                {`
                    .photoAndAbout {
                        display:flex;justify-content:space-between;
                        flex-wrap:wrap;
                    }
                    .photoContainer {
                        width:calc(40% - 5px);
                        margin:8px 0px 0px;
                        padding:0px;
                        position:relative;
                    }

                    .buttonWrap {
                        position: absolute;
                        left: 0px;
                        top:0px;
                        width:100%;
                        height:100%;
                        border-radius: 4px;
                        border: 1px solid #636363;  
                        pointer-events: none;
                        background-color: transparent;
                    }

                    .buttonWrap * {
                        pointer-events:auto;
                    }

                    #fotoTabungan {
                        position: absolute;
                        z-index: -1;
                        top: 15px;
                        left: 20px;
                        font-size: 17px;
                        color: #b8b8b8;
                    }                    

                    .photoButton {
                        background-color: #1d6355;
                        border-radius: 10px;
                        border: 4px double #cccccc;
                        color: #ffffff;
                        text-align: center;
                        padding: 8px;
                        width: 100px;
                        transition: all 0.25s;
                        cursor: pointer;
                        margin: 5px;
                      }
                      .photoButton:hover {
                        background-color: #00ab97;
                      }
                
                    .aboutContainer {
                        width:calc(60% - 5px);
                        margin:8px 0px 0px;
                        padding:0px;
                    }

                    .photoAndAboutHeight {
                        height: 230px;
                    }

                    .about {
                        display: flex;
                        flex-direction:column;
                        justify-content:flex-start;
                        align-items:start;
                        flex-wrap:wrap;
                    }

                    .marginTop {
                        margin-top:10px;
                    }

                    .saveCancelButton {
                        cursor:pointer;
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items:center;
                        padding: 5px;
                        border-radius:5px;
                    }

                    .saveButton {
                        color:green;
                        transition:all 0.25s;
                    }
                    .saveButton:hover {
                        color:#ffffff;
                        background-color:green;
                    }

                    .cancelButton {
                        color:brown;
                        transition:all 0.25s;
                    }
                    .cancelButton:hover {
                        color:#ffffff;
                        background-color:brown;
                    }

                    .btnLabel {
                        font-size:16px;
                    }

                    @media (max-width:768px){
                        .photoContainer{
                            width:100%;
                        }
                        .aboutContainer {
                            width:100%;
                        }
                    }
                `}
            </style>
        </div>
    )
}

const CheckElement = ({label, dispatch, checkState}:{label:string, dispatch:Dispatch<actionI>, checkState:boolean}) => {
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

const AddFeatures = ({title, dispatch, features}:{title:string, dispatch:Dispatch<actionI>, features:string[]}) => {
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