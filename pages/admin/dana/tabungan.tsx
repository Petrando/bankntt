import { useState, useEffect, useReducer } from "react";
import useSWR from 'swr';
import fetcher from "../../../lib/fetcher";
import Layout from "../../../components/admin/layout";
import Header from "../../../components/admin/components/header";
import ModalLayout from "../../../components/globals/ModalLayout";
import GridElement from "../../../components/admin/components/SavingGridElement";
import AddNewSaving from "../../../components/admin/saving/AddNewSaving";
import EditSaving from "../../../components/admin/saving/EditSaving";
import DeleteSaving from "../../../components/admin/saving/DeleteSaving";

const Savings = () => {
    const { data, mutate, error } = useSWR('/api/dana/tabungan/tabunganList', fetcher);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [idEdit, setEditId] = useState<string>("");
    const [idToDelete, setDeleteId] = useState<string>("");

    useEffect(()=>{
        console.log(data);
    }, [data])

    useEffect(()=>{
        mutate();
    }, [isAdding]);

    useEffect(()=>{
        if(idEdit === "") {
            mutate();
        }
    }, [idEdit])

    useEffect(()=>{
        if(idToDelete === "") {
            mutate();
        }
    }, [idToDelete])

    return (
        <Layout>
            <Header title={"Galeri Tabungan"} addNew={()=>{setIsAdding(true)}} />
            <div className={"container"}>
                {
                    !data &&
                    <p>loading...</p>
                }
                {
                    data &&
                    <div className={`${"imageGallery"} ${"margins"}`}>
                        {
                            data.map(d => <GridElement 
                                            key={d._id}
                                            data={d} 
                                            setEdit={(id)=>{setEditId(id)}}
                                            setDelete={(id)=>{setDeleteId(id)}}   
                                         />)
                        }
					</div>
                }
            </div>
            {
                isAdding &&
                <AddNewSaving closeForm={()=>{setIsAdding(false)}}/>
            }
            {
                idEdit !== "" &&
                <EditSaving 
                    closeForm={()=>{setEditId("")}}
                    editedData={data.filter(d=>d._id.toString()===idEdit)[0]}
                />
            }
            {
                idToDelete !== "" &&
                <ModalLayout closeModal={()=>{setDeleteId("")}} alignCenter={true}>
                    <DeleteSaving savingToDelete={data.filter(d=>d._id.toString() === idToDelete)[0]}                                 
                                  cancelDelete={()=>{setDeleteId("")}}
                    />
                </ModalLayout>
            }
            <style jsx>{`
                .container {
                    width:100%;
                    min-height:calc(100vh - 150px);
                    background-color:lightsteelblue;
                    display:flex;justify-content:center;align-items:center;flex-wrap:wrap;
                }
                .margins {
                    margin-top:15px;
                    margin-bottom: 60px;
                }
            `}</style>
        </Layout>        
    )
}

/*
<ModalLayout closeModal={()=>{setEditId("")}}>
                    <EditSaving closeForm={()=>{setEditId("")}}
                                editedData={data.filter(d=>d._id.toString()===idEdit)[0]}
                    />
                </ModalLayout>*/

export default Savings;