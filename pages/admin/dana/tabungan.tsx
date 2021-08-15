import { useState, useEffect } from "react";
import Layout from "../../../components/admin/layout";
import Message from "../../../components/UnderConstruction";
import Header from "../../../components/admin/components/header";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Savings = () => {
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [idxEdit, setEditIdx] = useState<number>(-1);

    return (
        <Layout>
            <Header title={"Tabungan"} addNew={()=>{setIsAdding(true)}} />
            <div className={"container"}>

            </div>
            <style jsx>{`
                .container {
                    width:100%;
                    height:calc(100vh - 150px);
                    background-color:lightsteelblue;
                    display:flex;justify-content:center;align-items:center;flex-wrap:wrap;
                }
            `}</style>
        </Layout>        
    )
}

export default Savings;