import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './Login.css'

import UserList from "./UserList"
import GuestList from "./GuestList"

import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
const axios = require("axios")
//import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
// import { render } from '../../back-end/app'
/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Fregley = props => {
  return (
    <>
      <h1>Welcome to ReFreegerator!</h1>
      <p>
          New User? <Link to="/create">Create an account</Link> or <Link to= "/GuestList"  >continue as a guest</Link>.
      </p>
        
    </>
  )
}




function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState({});
  const [loggedin, setLoggedin] = useState(false);
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

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
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/save`, {name: name, pass: pass})
      .then((response) => {
        console.log(response);
      })
      .catch(err => {
        console.log(`error error error! ${err}`)
      })
      setName('');
      setPass('');
  }
  

/*
  const handleSubmit = (event) => {
    //don't reload on submit
    event.preventDefault();
    var { uname, pass } = document.forms[0];

    // check for login info
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
*/
  // Generate JSX code for error message
  /*
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
*/
  // JSX code for login form
  const renderForm = (

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
  );
  if(true){
    return (
      <div className="app">
        <div className="login-form">
          <div className="title">Sign In</div>
            {renderForm}
{/*
            {isSubmitted ?<Navigate to = "/UserList"
                replace =  {true}/>: renderForm}
    */}
        </div>
        
      </div>
      
    );
  }
  else{
    <Navigate to = "/UserList"/>
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Login />, rootElement);
export default Login
