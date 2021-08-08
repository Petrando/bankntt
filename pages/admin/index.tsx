import React, { useState } from "react";
import useUser from "../../lib/useUser";
import Layout from "../../components/admin/layout";

const Admin = () => {    
  const { user, mutateUser } = useUser({ redirectTo: "/admin/login" });

  return (
      <Layout>
      <div className={"mainContainer"}>
      Admin menu here                   
      <style jsx>{`
        .mainContainer {
          max-width:100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }        
      `}</style>
    </div>
    </Layout>
  );
};

export default Admin;
