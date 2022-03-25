import { useState } from "react";
import './Edit.css'
import { useNavigate } from 'react-router-dom';

const Edit = props =>{
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
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
    const del = (event) =>{
        event.preventDefault();
        console.log("deleted");
        navigate('/UserList');
    }
      return (
        <>
        <h1>Edit an Item</h1>
        <form onSubmit={handleSubmit}>

      <label className="sec">Name:
      <input 
        type="text" 
        name="name" 
        value={inputs.name || ""} 
        // value={props.details.name || "name"} 
        onChange={handleChange}
      />
      </label>
        <br></br>
      <label className="sec"> Quantity:
        <input 
          type="number" 
          name="quantity" 
          value={inputs.quantity || ""} 
          // value={props.details.quantity || ""} 
          onChange={handleChange}
        />
        </label>
        <br></br>
        <label className="sec">Extra Information:
        <input 
          type="text" 
          name="info" 
          value={inputs.info || ""} 
          //value={props.details.info|| ""} 
          onChange={handleChange}
        />
        </label>
        <br></br>

        <label className="sec">Expiration Date:
        <input 
          type="date" 
          name="ex_date" 
          value={inputs.ex_date || ""} 
          //value={props.details.ex_date || ""} 
          onChange={handleChange}
        />
        </label>
        <br></br>

        <label className="sec">Enable Alerts:
        <input
        type="checkbox"
        name= "enableAlerts"
        //value = {props.details.value||""}
        // checked = {true}
        // checked = {props.details.checked}
        onChange={handleChange}
        />
        </label>

        <br></br>
      
        <label className="sec">Notify me:
        <input 
          type="number" 
          name="notif" 
          value={inputs.notif || ""} 
          //value={props.details.notif || ""} 
          onChange={handleChange}
        />
        days before expiration
        </label>
        <br></br>

        <input type="submit" />
    </form>
    <button onClick={cancel}>Cancel</button>
    <button onClick={del}>Delete Item</button>
        </>
      );
}
export default Edit;
