import React from 'react'
import "./Profile.css"
import { Link } from 'react-router-dom'
import ProfileForm from './ProfileForm'
const Profile = () => {
  return (
    <>
        <h1 className='Header'>Profile Preferences</h1> <br></br>
        <ProfileForm/>
        <Link to="/UserList"><button className='buttons1'>Back</button></Link>
    </>
  )
}

export default Profile

