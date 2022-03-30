import { useState } from "react";
import './Add.css'
import { useNavigate } from 'react-router-dom';

const Add = props =>{
    let currentdate = new Date();
    const autocomplete_names = [
        "yogurt",
    ];
    const placeholder = [
        {name: "yogurt", days:14, category: "dairy"} 
    ]
    const [inputs, setInputs] = useState({});
    const [autodate, setAutodate] = useState("");
    const navigate = useNavigate();
    const autoComplete = (event) => {
        let foodname = "undefined"
        //console.log(event.target.name);
        
        if (event.target.name == "name"){

             foodname = event.target.value;
             handleChange(event); 
        }
        //console.log(foodname);
        if (autocomplete_names.includes(foodname)){
            console.log("success");
            event.target.name = "ex_date";
            placeholder.forEach(auto_item =>
                {
                    if (auto_item.name == foodname){
                       //if (event.target.name = "ex_date"){
                           handleChange(event);
                           console.log("ex date = true");
                           console.log(auto_item);
                           console.log(currentdate);
                            //if (event.target.value == ""){
                                let newdate =  new Date();
                                newdate.setDate(currentdate.getDate() + auto_item.days)
                                const newdatestr = newdate.toLocaleDateString('en-CA');
                                event.target.value = newdatestr;
                                console.log("current date is: ");
                                console.log(currentdate);
                                console.log("new date is: ");
                                console.log(newdatestr);
                                console.log(event.target.value);
                                handleChange(event);
                            //}

                       //}

                    }
                }
            )
            event.target.name = "name";
        }
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;;
        setInputs(values => ({...values, [name]: value}))
      }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        navigate('/UserList');
    }
    const cancel = (event) =>{
      event.preventDefault();
      console.log("cancelled");
      navigate('/UserList');
    }
      return (
        <>
        <h1>Add an Item</h1>
        <form onSubmit={handleSubmit}>

      <label className="sec">Name:
      <input 
        type="text" 
        name="name" 
        value={inputs.name || ""} 
        onChange={autoComplete}
      />
      </label>
        <br></br>
      <label className="sec"> Quantity:
        <input 
          type="number" 
          name="quantity" 
          value={inputs.quantity || ""} 
          onChange={handleChange}
        />
        </label>
        <br></br>
        <label className="sec">Extra Information:
        <input 
          type="text" 
          name="info" 
          value={inputs.info || ""} 
          onChange={handleChange}
        />
        </label>
        <br></br>

        <label className="sec">Expiration Date:
        <input 
          type="date" 
          name="ex_date" 
          value={inputs.ex_date || ""} 
          onChange={handleChange}
        />
        </label>
        <br></br>

        <label className="sec">Enable Alerts:
        <input
        type="checkbox"
        name= "enableAlerts"
        value = "agree"
        onChange={handleChange}
        />
        </label>

        <br></br>
      
        <label className="sec">Notify me:
        <input 
          type="number" 
          name="notif" 
          value={inputs.notif || ""} 
          onChange={handleChange}
        />
        days before expiration
        </label>
        <br></br>
        <input type="submit" />
    </form>
    <button onClick={cancel}>Cancel</button>
        </>
      );
}
export default Add;
