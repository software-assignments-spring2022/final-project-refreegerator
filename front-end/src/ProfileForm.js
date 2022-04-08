import { useState } from "react"
import axios from "axios"
import "./Profile.css"
import { useLocalStorage } from "./useLocalStorage"
import ToggleSwitch from "./ToggleSwitch"



const ProfileForm = () => {
    // create a state variable for each form field
    const [days, setDays] = useLocalStorage("days","")
    const [suggest, setSuggest] = useLocalStorage("suggest","")
    const [auto, setAuto] = useLocalStorage("auto","")

    const onSuggestChange = (checked) => {
        setSuggest(checked);
    }
    const onAutoChange = (checked) => {
        setAuto(checked);
    }



    const submitForm = e => {
      e.preventDefault()
      console.log('front end')
      console.log(days)
      console.log(suggest)
      console.log(auto)
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
                <label>Default Notification before expiration (days): </label>
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
                    <ToggleSwitch
                    id = "suggest"
                    checked={suggest}
                    onChange={onSuggestChange}
                    />
                </div>
            </div>
        <div className='Preference'>
            <div className = 'column left'>
                <label>Autocomplete expiration dates for recognized items?</label>
            </div>
            <div className = 'column right'>
                    <ToggleSwitch
                    id = "auto"
                    checked={auto}
                    onChange={onAutoChange}
                    />
                </div>
        </div>    
        <input type="submit" value="Save"/>
      </form>
    )
  }
export default ProfileForm