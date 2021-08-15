import Layout from "../../../components/admin/layout";
import Header from "../../../components/admin/components/header";
import Message from "../../../components/UnderConstruction";

const Giro = () => {
    return (
        <Layout>
            <Header title={"Giro"} addNew={()=>{}} />
            <Message />
        </Layout>        
    )
}

export default Giro;