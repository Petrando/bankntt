import React, { useState } from "react";
import useUser from "../../lib/useUser";
import useEvents from "../../lib/useEvents";
import { useRouter } from "next/router";
import fetchJson from "../../lib/fetchJson";
import Button from "../../components/globals/Button";

const Admin = () => {    
  const { user, mutateUser } = useUser({ redirectTo: "/" });
  const router = useRouter();
  const { events, loadingEvents } = useEvents(user);

  async function handleLogout(event) {
    //event.preventDefault();
   
    mutateUser(
      await fetchJson("/api/logout", { method: "POST" }),
      false,
    );
    router.push("/");
  }

  return (
      <div className={"mainContainer"}>
      <Button label={"LOGOUT"} fullwidth onClickHandler={handleLogout} />                    
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
  );
};

export default Admin;
