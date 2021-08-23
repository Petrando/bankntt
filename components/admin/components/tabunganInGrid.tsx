import Image from "next/image";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { savingI } from "../../../types";
import galleryTabunganStyles from "../../../styles/produk/dana/GalleryTabungan.module.css";

const GridElement = ({data}:{data:savingI}) => {
    return (
        <div key={data._id} className={`${galleryTabunganStyles.tabungan} ${"imgContainer"}`}>
            <Image
                className={"img"}
                src={`data:${data.photo["Content-Type"]};base64, ${data.photo["data"]}`}
                layout="fill"
                objectFit="cover"
            />
            <div className={"titleContainer"}>
                <p>
                    {data.name}
                </p>
            </div>
            <div className={"footer"}>
                <p>
                    <span className={"button"}>
                        <EditIcon />
                    </span>                    
                    <span className={`${"button"}`}>
                        <DeleteIcon className={"button"} />    
                    </span>                    
                </p>                
            </div>
            <style jsx>
                {`
                    .imgContainer {
                        position:relative;
                        border-radius:5px;
                        overflow: hidden;                        
                    } 
                    
                    .titleContainer, .footer {
                        position:absolute;                        
                        width: 100%;
                        height: auto;
                        background-color:rgba(0, 0, 0, 0.75);                        
                    }

                    .titleContainer {
                        left:0px;
                        top: 0px;
                    }

                    .titleContainer p {
                        color:#ffffff;
                        padding:20px auto; 
                        margin-left:5px;                       
                    }

                    .footer {
                        left:0px;
                        bottom:0px;
                    }

                    .footer p {
                        color:#ffffff;                                            
                        text-align:right;
                        padding:20px auto; 
                        display:flex;
                        justify-content:flex-end;
                        align-items:center;
                    }

                    .button {
                        cursor:pointer;
                        color:#ffffff;
                        transition:all 0.25s;
                        border-radius:3px;
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items:center;                        
                    }

                    .button:last-child {
                        margin:auto 5px;
                    }

                    .button:hover {
                        color:#000000;
                        background:#ffffff;
                    }

                    .img{
                        position:absolute;
                        left:0px;
                        top: 0px;
                        
                    }
                `}
            </style>
        </div>
    )
}

export default GridElement;