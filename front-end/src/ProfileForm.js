import { useState } from "react"
import axios from "axios"
import "./Profile.css"
import { Link } from 'react-router-dom'

const ProfileForm = () => {
    // create a state variable for each form field
    const [days, setDays] = useState('')
    const [suggest, setSuggest] = useState('')
    const [auto, setAuto] = useState('')

    const submitForm = e => {
      e.preventDefault()
      console.log('front end')
      console.log(days)
      console.log(suggest)
      axios
        .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/profile/save`, {
          days: days,
          suggest: suggest,
          auto:auto,
        })
        .then(response => {
        })
        .catch(err => {
          console.log('error')
        })

    }  
    return (
      <form className="Preferences" onSubmit={submitForm}>
        <div className='Preference'>
            <div className = 'column left'>
                <label>Deafult Notification before expiration (days): </label>
            </div>
            <div className = 'column right'>
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
                <div className = 'column left'>
                    <label>Suggest nearby stores stocked with relevant items?</label>
                </div>
                <div className = 'column right'>
                    <label className="switch">
                        <input 
                            type="checkbox"
                            onChange={e => setSuggest(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        <div className='Preference'>
            <div className = 'column left'>
                <label>Autocomplete expiration dates for recognized items?</label>
            </div>
            <div className = 'column right'>
                <label className="switch">
                    <input 
                    type="checkbox"
                    onChange={e => setAuto(e.target.checked)}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>    
        <Link to="/UserList"><input type="submit" value="Save" /></Link>
      </form>
    )
  }
  export default ProfileForm
  /**<form onSubmit={handleSubmit} className='Preferences' method="Post">
  <div className='Preference'>
      <div className = 'column left'>
          <label>Deafult Notification before expiration (days): </label>
      </div>
      <div className = 'column right'>
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
  
  <Link to="/UserList"><input type="submit" className='save' value="Save"/></Link>                    
  </form>*/