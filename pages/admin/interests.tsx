import React, { useState } from "react";
import useUser from "../../lib/useUser";
import Layout from "../../components/admin/layout";
import InterestRate from "../../components/admin/home/InterestRate";

const Interests = () => {    
  const { user, mutateUser } = useUser({ redirectTo: "/admin/login" });

  return (
      <Layout>
      <div className={"mainContainer"}>
        <InterestRate />                  
      <style jsx>{`
        .mainContainer {
          max-width:100%;
          min-height: 100%;
          height:100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
        }        
      `}</style>
    </div>
    </Layout>
  );
};

export default Interests;
