import { useState, useEffect, useRef, Fragment, Dispatch } from "react";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import RefreshIcon from '@material-ui/icons/Refresh';
import BlockIcon from '@material-ui/icons/Block';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import MyDialog from "../../globals/Dialog";
import { savingFormI, savingActionI } from "../../../types";
import Header from "../../../components/admin/components/header";
import dialogStyles from "../../../styles/admin/ProductDialog.module.css";
import styles from "../../../styles/admin/TabunganForm.module.css";

const SavingForm = ({formState, dispatch, saveData, mayNotSave, closeForm, resetForm, editedPhotoSrc}:
                    {
                        editedPhotoSrc?:string;
                        formState:savingFormI, 
                        dispatch:Dispatch<savingActionI>,
                        saveData:()=>void,
                        resetForm?:()=>void,
                        mayNotSave:()=>boolean,
                        closeForm:()=>void
                    }) => {

    const getMyFeatures = (featureLabel: string):string[] => {
        const featureIdx = formState.saving.termsFeatures.findIndex((d)=>d.name===featureLabel);
        return formState.saving.termsFeatures[featureIdx].features;
    }

    const dialogTitle = ():string => {
        return (
            !formState.loading?
            isEditForm?
            "Edit " + formState.saving.name:
            "Jenis Tabungan Baru":
            "Menyimpan Data...."                
        )
    }

    const dialogContent = ():JSX.Element => {
        return (
            <>
                <label htmlFor="namaTabungan" className={`${"label"} ${"width100"}`}>Nama Tabungan</label>
                <input type="text" className={`${"input"} ${"width100"}`} id="namaTabungan" name="namaTabungan" 
                    value={formState.saving.name}
                    onChange={(e)=>{
                        dispatch({type:"CHANGE_NAME", name:e.target.value});
                    }}
                    disabled={formState.loading}
                />
                <div className={`${"width100"} ${styles.photoAndAbout}`} >
                    <div className={`${styles.photoContainer}`}>
                        {
                            (isEditForm || formState.saving.displayPhoto!==null) && 
                            <img 
                                src={formState.saving.displayPhoto!== null?formState.saving.displayPhoto:editedPhotoSrc} 
                                style={{width:"100%", height:"100%"}} />
                        }
                        <span className={`${styles.buttonWrap} ${"centerRowFlex"}`}>
                            <label htmlFor="fotoTabungan" className={`${styles.photoButton} ${"centerRowFlex"}`}>
                                <CameraAltIcon style={{marginLeft:"3px"}}/>
                                Foto
                            </label>
                            <input type="file" className={`${"input"} ${"width100"} ${styles.photoAndAboutHeight}`} id="fotoTabungan" 
                                onChange={(e)=>{
                                    const _URL = window.URL || window.webkitURL;//additional for getting image file
                                    const photoFile = e.target.files[0];
                                    console.log(photoFile)
                                    if(!photoFile){
                                        console.log("no files");
                                        return;
                                    }else {
                                        const img = new Image();
                                        let objectUrl = _URL.createObjectURL(photoFile);
                                        img.onload = () => {
                                            if(typeof img !== "undefined"){
                                                console.log(img.width, ', ', img.height);
                                                dispatch({type:"SET_PHOTO_DIMENSION", photoWidth:img.width, photoHeight:img.height});
                                                _URL.revokeObjectURL(objectUrl)
                                            }
                                        }
                                        img.src = objectUrl;
                                        dispatch({type:"SET_PHOTO", photo:photoFile, displayPhoto:URL.createObjectURL(photoFile)});
                                    }
                                }}
                                disabled={formState.loading}
                            />    
                        </span>                    
                    </div>
                    <div className={styles.aboutContainer}>
                        <label htmlFor="about" className={`${"label"} ${"width100"}`}>Uraian</label>
                        <textarea 
                            rows={10}
                            className={`${"input"} ${"width100"} ${styles.about}`} 
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
            </>
        )
    }

    const dialogFooter = ():JSX.Element => {
        return (
            <>
                <span className={`
                                  ${styles.saveCancelButton} 
                                  ${styles.saveButton} 
                                  ${(mayNotSave() || formState.loading) && "inactiveButton"}
                                `}
                    onClick={()=>{saveData()}}                    
                >
                    <SaveIcon fontSize={"large"} />    
                    <span className={styles.btnLabel}>
                        Simpan
                    </span>
                </span>                
                {
                    isEditForm && 
                    <span className={`
                                      ${styles.saveCancelButton} 
                                      ${styles.resetButton} 
                                      ${(mayNotSave() || formState.loading) && "inactiveButton"}
                                    `}
                        onClick={()=>{resetForm()}}
                    >
                        <RefreshIcon fontSize={"large"} />
                        <span className={styles.btnLabel}>
                            Reset
                        </span>
                    </span> 
                }                
                <span className={`${styles.saveCancelButton} ${styles.cancelButton} ${formState.loading && "inactiveButton"}`}
                    onClick={()=>{closeForm()}}
                >
                    <CancelIcon fontSize={"large"} />
                    <span className={styles.btnLabel}>
                        Batal
                    </span>
                </span>
            </>
        )
    }

    const isEditForm = editedPhotoSrc && editedPhotoSrc!=="";

    return (
        <MyDialog
            title={dialogTitle()}
            content={dialogContent()}
            footer={dialogFooter()}
        />
    )
}

const CheckElement = ({label, dispatch, checkState}:{label:string, dispatch:Dispatch<savingActionI>, checkState:boolean}) => {
    return (
        <span className={`${"flexRowStart"} ${"checkspan"}`}>
            <input type={"checkbox"} id={label} name={label} value={label} 
                checked={checkState}
                onChange={()=>{dispatch({type:"TOGGLE_CHECKBOX", featureCheck:label, newState:!checkState})}}
            />
            <label  htmlFor={label}>{label}</label>
            <style jsx>{`
                .checkspan {
                    width:24%;
                }

                @media (max-width:411px){
                    .checkspan {
                        width:95%;
                    }
                }

                @media (min-width:412px) and (max-width:768px){
                    .checkspan {
                        width:49%;
                    }
                }
            `}</style>
        </span>
    )
}

const AddFeatures = ({title, dispatch, features}:
                     {
                         title:string, 
                         dispatch:Dispatch<savingActionI>, 
                         features:string[]
                     }) => {
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [idxEdited, setEditedIdx] = useState<number>(-1);

    const addEditFeature = (feature) => {
        let updatedFeatures = features.slice();
        if(isAdding){
            dispatch({type:"ADD_TERM_OR_FEATURE", featureName:title, feature})
        }else if(idxEdited > -1){
            dispatch({type:"EDIT_TERM_OR_FEATURE", featureName:title, feature, featureIdx:idxEdited});
        }
        setIsAdding(false);
        setEditedIdx(-1);
    }

    const deleteFeature = (idx) => {
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
                            onClick={()=>{
                                setEditedIdx(i)
                            }}
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
        myRef.current.scrollIntoView();
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

export default SavingForm;