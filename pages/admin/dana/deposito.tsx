import Layout from "../../../components/admin/layout";
import Header from "../../../components/admin/components/header";
import Message from "../../../components/UnderConstruction";


const Deposito = () => {
    return (
        <Layout>
            <Header title={"Deposito"} addNew={()=>{}} />
            <Message />
        </Layout>        
    )
}

export default Deposito;