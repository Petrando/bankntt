import { ReactNode } from "react";

interface ModalI {
    children:ReactNode;
    closeModal:()=>void;
}

const ModalLayout = ({children, closeModal}:ModalI) => {
    return (
        <div className={"modal"} onClick={closeModal}>
            {
                children
            }
            <style jsx>
                {`
                    .modal {
                        width:100%;
                        height:100vh;
                        position:fixed;
                        left:0px;
                        top:0px;
                        z-index: 3000;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        transition: all 0.25s;
                        background-color: rgba(0, 0, 0, 0.75)
                    }
                `}
            </style>
        </div>
    )
}

export default ModalLayout;