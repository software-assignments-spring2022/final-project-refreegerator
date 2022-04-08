import { useState } from "react"
import axios from "axios"
import "./Profile.css"
import { useLocalStorage } from "./useLocalStorage"



const ProfileForm = () => {
    // create a state variable for each form field
    const [days, setDays] = useLocalStorage("days","")
    const [suggest, setSuggest] = useLocalStorage("suggest","")
    const [auto, setAuto] = useLocalStorage("auto","")



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

    function handleRadioButton(value) {
        this.setState({
            value: value
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
                    <label className = 'radio'>
                        <input 
                            type="radio"
                            value="no"
                            name="choiceradio"
                            //checked={this.state.value === "no"}
                            onClick={e => setSuggest(e.target.value)}
                            //onClick={this.handleRadioButton}
                        />
                        no
                        <label className = 'radiogap'>
                        <input 
                            type="radio"
                            value="yes"
                            name="choiceradio"
                            onClick={e => setSuggest(e.target.value)}
                        />
                        yes
                        </label>
                    </label>
                </div>
            </div>
        <div className='Preference'>
            <div className = 'column left'>
                <label>Autocomplete expiration dates for recognized items?</label>
            </div>
            <div className = 'column right'>
            <label className = 'radio'>
                        <input 
                            type="radio"
                            value="no"
                            name="choiceradio2"
                            //checked={this.state.value === "no"}
                            onClick={e => setAuto(e.target.value)}
                            //onClick={this.handleRadioButton}
                        />
                        no
                        <label className = 'radiogap'>
                        <input 
                            type="radio"
                            value="yes"
                            name="choiceradio2"
                            onClick={e => setAuto(e.target.value)}
                        />
                        yes
                        </label>
                    </label>
            </div>
        </div>    
        <input type="submit" value="Save"/>
      </form>
    )
  }
export default ProfileForm
 