import { ReactNode } from "react";

interface ModalI {
    children:ReactNode;
    alignCenter?:boolean;
    closeModal:()=>void;
}

const ModalLayout = ({children, alignCenter, closeModal}:ModalI) => {
    
    return (
        <div className={`${"modal"} ${alignCenter && "alignCenter"}`} onClick={closeModal}>
            {
                children
            }
            <style jsx>
                {`
                    .modal {
                        width:100%;
                        max-height:100vh;
                        height:100vh;
                        position:fixed;
                        left:0px;
                        top:0px;
                        z-index: 3000;
                        display:flex;
                        justify-content:center;
                        transition: all 0.25s;
                        background-color: rgba(0, 0, 0, 0.75);
                        overflow-y:auto;
                    }

                    .alignStretch {
                        align-items:stretch;
                    }

                    .alignCenter {
                        align-items:center;
                    }
                `}
            </style>
        </div>
    )
}

export default ModalLayout;