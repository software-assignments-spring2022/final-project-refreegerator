import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './Create.css'
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { Navigate } from "react-router-dom";

const axios = require("axios")


/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */




const Create = props =>{
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [signedIn, setSignedIn] = useState(false);
  // User Login info
  /*
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };
*/
const handleSubmit = e =>{
  e.preventDefault();
  console.log((name));
  console.log((pass));
  axios
    .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/create/save`, {name: name, pass: pass})
    .then((response) => {
      console.log(response);
    })
    .catch(err => {
      console.log(`error error error! ${err}`)
    })
  setSignedIn(true);
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
    
    <div> New User? <a href="/create">Create an account</a> or <a href= "/guestlist">continue as a guest.</a> </div> 
  </div>
  </>
);
  return (
    <>
    <div className="app">
      
      <div className="login-form">
        <div className="title">Create Account</div>
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

const rootElement = document.getElementById("root");
ReactDOM.render(<Create />, rootElement);
export default Create
