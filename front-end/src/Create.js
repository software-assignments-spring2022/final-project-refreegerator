import './Create.css'
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Navigate, useSearchParams } from "react-router-dom";

const axios = require("axios")


const Create = props =>{
  let [urlSearchParams] = useSearchParams() // get access to the URL query string parameters

  // React States
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [signedIn, setSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")


  useEffect(() => {
    const qsError = urlSearchParams.get("error") 
    if (qsError === "protected")
      setErrorMessage("Please log in to view our fabulous protected content.")
  }, []) 


const handleSubmit = e =>{
  e.preventDefault();
  axios
    .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/create/save`, {name: name, pass: pass})
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      if (response.data.success == true){
        setSignedIn(true)
        localStorage.setItem("username", name)
      }
    })
    .catch(err => {
      if (err.response?.status === 401){
        setErrorMessage("this username is taken")
      }
      console.log(`error error error! ${err}`)
    })
}
/*
  const handleSubmit = (event) => {
    //don't reload on submit
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    
    const userData = database.find((user) => user.username === uname.value); //this will be more integrated once we work with mongodb more

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
*/
/*
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
        <br></br>
        
        
      </form>
      
      <div> Already a user? <a href="/">Sign in</a>, or <a href = "/guestlist">continue as a guest.</a>  </div> 
    </div>
  );
*/

const renderForm = (
<>
  <div className="form">
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label>Username </label>
        <input type="text" value={name} required onChange={e => setName(e.target.value)} />
        {/* {renderErrorMessage("uname")} */}
      </div>
      <div className="input-container">
        <label>Password </label>
        <input type="password" value={pass} required onChange={e => setPass(e.target.value)}/>
        {/* {renderErrorMessage("pass")} */}
      </div>
      <div className="button-container">
        <input type="submit" />
      </div>
      <br></br>
    </form>
    
    <div>Already a user? <a href="/">Login</a> or <a href= "/guestlist">continue as a guest.</a> </div> 
  </div>
  </>
);
  return (
    <>
    <div className="app">
      
      <div className="login-form">
        <div className="title">Create Account</div>
        {errorMessage}

        {/*
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
  */}
        {/* {renderForm} */}

        {signedIn ?<Navigate to = "/UserList"/>: renderForm}
      </div>
      
    </div>
    </>
  );
}


export default Create
