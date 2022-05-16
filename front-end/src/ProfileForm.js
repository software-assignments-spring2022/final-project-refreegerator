import {useState, useEffect} from "react"
import axios from "axios"
import "./Profile.css"
import ToggleSwitch from "./ToggleSwitch"



const ProfileForm = () => {
    // create a state variable for each form field
    /*
    const [days, setDays] = useLocalStorage("days","0")
    const [suggest, setSuggest] = useLocalStorage("suggest",false)
    const [auto, setAuto] = useLocalStorage("auto",false)*/
    const username = localStorage.getItem("username")
    const [days, setDays] = useState("0")
    const [suggest, setSuggest] = useState(true)
    const [auto, setAuto] = useState(true)
    const [response, setResponse] = useState({})
    const onSuggestChange = (checked) => {
        setSuggest(checked);
    }
    const onAutoChange = (checked) => {
        setAuto(checked);
    }

    const fetchData = async() => {
      try {
        console.log(username);
          await axios
            .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/profileform`, {params:{username: username}})
            .then((response) =>{
              console.log(response.data)
              setResponse(response.data.preferences);
              
              setDays(response.data.preferences.notification);
              setSuggest(response.data.preferences.suggest);
              setAuto(response.data.preferences.auto);
            })
            .catch(err =>{
              console.log(err)
            })
          

      }
      catch(error){
          console.log(error);

      }
  };
  useEffect(()=>{
    fetchData();
    setDays(response.notification);
    setSuggest(response.suggest);
    setAuto(response.auto);
  },[])
    const submitForm = e => {
      e.preventDefault()
      axios
        .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/profile/save`, {
          days: days,
          suggest: suggest,
          auto:auto,
          username: username
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