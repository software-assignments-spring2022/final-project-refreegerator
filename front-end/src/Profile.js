import React from 'react'
import "./Profile.css"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
const Profile = props => {
  const [days, setDays] = useState("")
  const [suggest, setSuggest] = useState("")
  const [auto, setAuto] = useState("")
  useEffect(() => {
    console.log("hello world")
  }, [days]) 
  const handleSubmit = e => {
    e.preventDefault() 
    axios
      .post("", {
        days: days,
        suggest: suggest,
        auto:auto,
      })
      .then(response => {
        // success
        console.log(`Received server response: ${response.data}`)
      })
      .catch(err => {
        // failure
        console.log(`Received server error: ${err}`)
      })
  }
  return (
    <>
        <h1 className='Header'>Profile Preferences</h1> <br></br>
        <form className='Preferences' onSubmit={handleSubmit}>
            <div className='Preference'>
                <div className = 'column'>
                    <label>Deafult Notification before expiration (days): </label>
                </div>
                <div className = 'column'>
                    <input 
                        type = "number" 
                        step = "1" 
                        min ='0' 
                        max='9'
                        id = 'number' 
                        value={days}
                        onChange={e => setDays(e.target.value)}
                    />
                </div>
            </div>
            <div className='Preference'>
                <div className = 'column'>
                    <label>Suggest nearby stores stocked with relevant items?</label>
                </div>
                <div className = 'column'>
                    <label className="switch">
                        <input 
                            type="checkbox"
                            value={suggest}
                            onChange={e => setSuggest(e.target.value)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
            <div className='Preference'>
                <div className = 'column'>
                    <label>Autocomplete expiration dates for recognized items?</label>
                </div>
                <div className = 'column'>
                    <label className="switch">
                        <input 
                        type="checkbox"
                        value={auto}
                        onChange={e => setAuto(e.target.value)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
            <input type="submit" className='save' value="Save"/>                    
        </form>
        <Link to="/"><button className='buttons1'>Back</button></Link>
    </>
  )
}

export default Profile

