import {useState} from "react";
import { savingI } from "../../../types";
import Image from "next/image"
import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/Delete';
import fetchJson from "../../../lib/fetchJson";
import dialogStyles from "../../../styles/admin/ProductDialog.module.css";

interface deleteSavingI {
    savingToDelete:savingI;    
    cancelDelete:()=>void;
}

const DeleteSaving = ({savingToDelete, cancelDelete}:deleteSavingI):JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteSaving = async () => {
        setIsLoading(true);

        try {
			const deleteResult = await fetchJson("/api/dana/tabungan/deleteASaving", {
			  method: "POST",
              headers: {
                Accept: 'application/json'
              },
			  body: JSON.stringify({id:savingToDelete._id})
			});
			
            console.log(deleteResult);
			if(deleteResult.message === "success"){
                cancelDelete();
            }else {
                setIsLoading(false);
            }
			
		  } catch (error) {
			console.error("An unexpected error happened:", error);
            setIsLoading(false);
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
                    {
                        isLoading?
                        `Menghapus  ${savingToDelete.name} ...`:
                        `Hapus ${savingToDelete.name}?`
                    }
                    
                    
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
                <span className={`${"deleteCancelButton"} ${"deleteButton"} ${isLoading && "inactiveButton"}`}
                    onClick={()=>{deleteSaving()}}                    
                >
                    <DeleteIcon fontSize={"large"} />    
                    <span className={"btnLabel"}>
                        Hapus
                    </span>
                </span> 
                <span className={`${"deleteCancelButton"} ${"cancelButton"} ${isLoading && "inactiveButton"}`}
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