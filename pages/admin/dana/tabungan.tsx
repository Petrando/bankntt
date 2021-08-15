import Layout from "../../../components/admin/layout";
import Message from "../../../components/UnderConstruction";
import Header from "../../../components/admin/components/header";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Savings = () => {
    return (
        <Layout>
            <Header title={"Tabungan"} addNew={()=>{}} />
            <Message />
        </Layout>        
    )
}

export default Savings;