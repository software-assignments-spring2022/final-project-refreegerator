import React from 'react'
import "./Profile.css"
import { Link } from 'react-router-dom'
import ProfileForm from './ProfileForm'
import Header from "./Header"
import {useLocation} from "react-router-dom"
import { useState, useEffect} from "react";
const Profile = (props) => {
    const location = useLocation();
    let {passpreferences} = location.state
    let {expiringItems} = location.state
  return (
    <>
        <Header
            profilePreferences = {passpreferences}
            expiringItems = {expiringItems}

        />
        <h1 className='Header'>Profile Preferences</h1> <br></br>
        <ProfileForm/>
        <Link to="/UserList"><button className='buttons1'>Back</button></Link>
    </>
  )
}

export default Profile

