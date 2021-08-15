import AddIcon from '@material-ui/icons/Add';
import buttonStyles from "../../../styles/components/Button.module.css";

interface HeaderI {
    title:string;
    addNew:()=>void;
}

const Header = ({title, addNew}:HeaderI) =>{
    return (
        <div className={"header"}>
            <h2 className={`${"title"} ${"headerTitle"}`}>
                {title}
            </h2>
            <div className={"headerButtonContainer"}>
                <span className={"headerButton"}>
                    Tambah{" "}<AddIcon fontSize={"medium"} />
                </span>
            </div>
            <style jsx>{`
                .header {
                    display:flex;justify-content:center;
                    flex-wrap:wrap;
                }
                .headerTitle {
                    text-align:center;
                    flex:0.8;
                }
                .headerButtonContainer {
                    flex:0.2;
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