import React, { useState } from "react";
import {Home} from "@material-ui/icons";
import Link from "next/link";
import Button from "../../components/globals/Button";
import useUser from "../../lib/useUser";
import fetchJson from "../../lib/fetchJson";

const Login = () => {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/admin",
    redirectIfFound: true,
  });

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleLogin(event) {
    event.preventDefault();

    //: event.currentTarget.username.value,
    const body = {
      username, password
    };

    try {
      const loginResult = await fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if(!loginResult.isLoggedIn){
        setErrorMsg("username/password error");
      }else {
        setErrorMsg("");
        mutateUser(loginResult);
      }
      
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg(error.data.message);
    }
  }

  return (
      <div className={"loginContainer"}>
      <form className="login">   
        <Link href={"/"}>
          <span className={"backToHome"}>
            <Home fontSize="large" />
          </span>
        </Link>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" placeholder="Your username" 
          onChange={(e)=>{setUsername(e.target.value)}}
        />     
        <label htmlFor="password">Passsword:</label>
        <input className={"lastChild"} type="password" id="password" name="password" placeholder="" 
          onChange={(e)=>{setPassword(e.target.value)}}
        />     
        <Button label={"Login"} fullwidth onClickHandler={handleLogin} isSubmitButton={true} />            
        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>
      <style jsx>{`
        .loginContainer {
          max-width:100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .login {
          width: 50%;
          margin: auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }

        @media (max-width: 648px) {
          .login {
            width: 90%;
          }
        }

        .login label,
        .login select,
        .login input,
        .login textarea,
        .login button {
            width: 100%;
            margin-bottom: 0px;
        }

        
        .login label {          
          letter-spacing: 0.01em;
          text-align: left;
          color: #636363;
        }

        .login label:first-child {
          margin-top: 4px;
        }

        .login select,
        .login input,
        .login textarea {
          margin-top: 10px;
          margin-bottom:10px;
          padding-left: 15px;
          border-radius: 4px;
          border: 1px solid #636363;
        }

        .login select,
        .login input {
          height: 40px;
          margin-bottom: 10px;
        }

        .login input:last-child {
          margin-bottom: 20px;
        }

        .backToHome {
          color:#000000;
          transition:all 0.25s;
        }

        .backToHome:hover {
          color:#ffffff;
          background-color:#000000;
          cursor:pointer;
          border-radius:4px;
        }

        .error {
            color: brown;
            margin: 1rem 0 0;
        }
      `}</style>
    </div>
  );
};

export default Login;
