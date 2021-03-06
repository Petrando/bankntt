import React, { useState } from "react";
import useUser from "../../lib/useUser";
import Layout from "../../components/admin/layout";

const Admin = () => {    
  const { user, mutateUser } = useUser({ redirectTo: "/admin/login" });

  return (
      <Layout>
      <div className={"mainContainer"}>
        <h1>Admin menu here</h1>
      <style jsx>{`
        .mainContainer {
          max-width:100%;  
          display:flex;
          justify-content:center;
          align-items:center;      
        }        
      `}</style>
    </div>
    </Layout>
  );
};

export default Admin;
