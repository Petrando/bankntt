import { savingI } from "../../../types";
import Image from "next/image"
import BlockIcon from '@material-ui/icons/Block';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import dialogStyles from "../../../styles/admin/ProductDialog.module.css";
import { Delete } from "@material-ui/icons";

interface deleteSavingI {
    savingToDelete:savingI;    
    cancelDelete:()=>void;
}

const DeleteSaving = ({savingToDelete, cancelDelete}:deleteSavingI):JSX.Element => {
    const deleteSaving = () => {

    }
    return (
        <div className={dialogStyles.dialog}
            onClick={(e)=>{
                e.stopPropagation();
            }}
        >
            <div className={dialogStyles.dialogContent}>
                <h4 className={`${"dialogTitle"} ${"width100"}`}>
                    Hapus {savingToDelete.name}?
                </h4>
                <div className={`${"imgContainer"} ${"centerRowFlex"}`}>
                    <Image src={`data:${savingToDelete.photo["Content-Type"]};base64, ${savingToDelete.photo["data"]}`} 
                       width={savingToDelete.photo.width}
                       height={savingToDelete.photo.height}
                       objectFit={"cover"}
                    />
                </div>
                <p>
                    {savingToDelete.about}
                </p>
            </div>
            <div className={dialogStyles.dialogFooter}>
                <span className={`${"deleteCancelButton"} ${"deleteButton"}`}
                    onClick={()=>{deleteSaving()}}                    
                >
                    <DeleteIcon fontSize={"large"} />    
                    <span className={"btnLabel"}>
                        Hapus
                    </span>
                </span> 
                <span className={`${"deleteCancelButton"} ${"cancelButton"}`}
                    onClick={()=>{cancelDelete()}}                    
                >
                    <BlockIcon fontSize={"large"} />    
                    <span className={"btnLabel"}>
                        Batal
                    </span>
                </span>
            </div>
            <style jsx>{`
                .imgContainer {
                    max-height:350px;
                    overflow:hidden
                }

                @media (max-width: 648px) {
                    .imgContainer {
                        max-height: 275px;
                    }
                }

                .deleteCancelButton {
                    cursor:pointer;
                    display:flex;
                    flex-direction:column;
                    justify-content:center;
                    align-items:center;
                    padding: 5px;
                    border-radius:5px;
                }

                .deleteButton {
                    color:brown;
                    transition:all 0.25s;
                }
                .deleteButton:hover {
                    color:#ffffff;
                    background-color:brown;
                }

                .cancelButton {
                    color: orange;
                    transition:all 0.25s;
                }

                .cancelButton:hover {
                    color:#ffffff;
                    background-color:orange;
                }

                .btnLabel {
                    font-size:16px;
                }
            `}</style>
        </div>
    )
}

export default DeleteSaving;