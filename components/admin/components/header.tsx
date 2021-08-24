import AddIcon from '@material-ui/icons/Add';
import buttonStyles from "../../../styles/components/Button.module.css";

interface HeaderI {
    isMedium?:boolean;
    title:string;
    addNew:()=>void;
    mayAdd?:boolean;
}

const Header = ({isMedium, title, addNew, mayAdd}:HeaderI) =>{

    return (
        <div className={"header"}>
            <h2 className={`${"title"} ${isMedium?"addFeatureTitle":"headerTitle"}`}>
                {title}
            </h2>
            <div className={`${isMedium?"addFeatureButtonContainer":"headerButtonContainer"}`}>
                <span className={`${"headerButton"} ${typeof mayAdd!=="undefined" && mayAdd===false && "inactiveButton"}`} onClick={()=>{addNew();}}>
                    Tambah{" "}
                    <AddIcon fontSize={"medium"} />
                </span>
            </div>
            <style jsx>{`
                .header {
                    display:flex;justify-content:space-between;align-items:center;
                }
                .headerTitle {
                    text-align:center;
                    flex:0.8;
                }
                .addFeatureTitle {
                    text-align:left;
                    font-weight: 500;
                    font-size: 22px;
                }
                .headerButtonContainer {
                    flex:0.2;
                    display:flex; justify-content:center; align-items:center;
                }
                .addFeatureButtonContainer {
                    display:flex; justify-content:center; align-items:center;
                }
                .headerButton {
                    padding:10px 10px;
                    display:flex; justify-content:center; align-items:center;
                    border-radius: 10px;
                    transition:all 0.25s;     
                    cursor:pointer;               
                }

                .headerButton:hover {
                    color:#ffffff;
                    background-color:darkblue;
                    font-weight:bold;
                }
            `}</style>
        </div>
    )
}

export default Header;