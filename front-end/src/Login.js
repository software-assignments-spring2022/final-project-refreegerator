import './Login.css'

import { Navigate, useSearchParams } from "react-router-dom"

import React, { useEffect, useState } from "react";
import "./styles.css";

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
 const axios = require("axios")

const Login =props => {
  let [urlSearchParams] = useSearchParams() // get access to the URL query string parameters

  // React States
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const [response, setResponse] = useState({}) 
  const [errorMessage, setErrorMessage] = useState("")
  useEffect(() => {
    const qsError = urlSearchParams.get("error") 
    if (qsError === "protected")
      setErrorMessage("Please log in to view our fabulous protected content.")
  }, []) 
  useEffect(() => {
    if (response.success && response.token) {
      console.log(`User successfully logged in: ${response.username}`)
      localStorage.setItem("token", response.token) 
      localStorage.setItem("username", response.username)
    }
  }, [response])


  const handleSubmit = async e =>{
    e.preventDefault();
    axios
    .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/save`, {name: name, pass: pass})
    .then((response) => {
      setResponse(response.data);
      setErrorMessage(response.data.message);
      console.log(response.data);
    })
    .catch(err => {
      console.log(`error error error! ${err}`)
      console.log(response)
      setErrorMessage('inavlid');

    })
    /*
    const r = await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/save`, {name: name, pass: pass});
    setResponse(r.data);
    setErrorMessage(r.data.message);*/
    setName('');
    setPass('');

    
  }
  
  // JSX code for login form
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
      
      <div> New User? <a href="/create">Create an account</a> or <a href= "/guestlist">continue as a guest.</a> </div> 
    </div>
    </>
  );
  if(!response.success){
    return (
      <>
      <div className="app">
        <div className="login-form">
          <div className="title">Sign In</div>
          {errorMessage}
            {renderForm}
        </div>
        
      </div>
      </>
    );
  }
  else{
    return(<Navigate to = "/UserList"/>)
  }
}


export default Login
