import { useState } from "react";
import './Edit.css'
import { useNavigate } from 'react-router-dom';
import UserList from "./UserList"
import axios from "axios"

const GuestEdit = (props) =>{
    const [inputs, setInputs] = useState(props.listitem);
    const [update, setUpdate] = useState(false);
    //console.log(props.func.toString());
    const navigate = useNavigate();
    const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setInputs(values => ({...values, [name]: value}))
    }
    if (props.setEditAll != null){
        props.setEditAll(false)
    }
    props.setSingleItem(true)
   //console.table(inputs) 
    function removeEntry(){
      let existingEntries = JSON.parse(localStorage.getItem("items"));
      if(existingEntries == null) existingEntries = [];
      localStorage.removeItem(JSON.stringify(inputs));
      //existingEntries.push(inputs);
      //delete existingEntries[key];

      localStorage.setItem("items", JSON.stringify(existingEntries));
    }
    
    const handlesubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        let newlist = props.currentlist
        newlist[props.currentlist.indexOf(props.listitem)] = inputs
        console.table(newlist)
        props.changelist(newlist)
        props.func(false)
        //navigate('/userlist');
        
        let existingEntries = JSON.parse(localStorage.getItem("items"))
        if(existingEntries == null) existingEntries = [];
        console.log("existing entries: ")
        console.log(props.listitem)
        console.table(existingEntries)
        console.log(existingEntries)
        let newarr = existingEntries.filter(
            (iterateitem) => (JSON.stringify(iterateitem) != JSON.stringify(props.listitem)
        ))
        newarr.push(inputs)
        console.log("after filtering, existing entries: ")
        console.table(newarr)
        localStorage.setItem("items", JSON.stringify(newarr))
        //props.changelist(newarr)
        props.func(false);
        console.log("delete item was called");
        //navigate('/userlist');
    }
    const cancel = (event) =>{
        event.preventDefault();
        console.log("cancelled");
        props.func(false);
        setUpdate(true);
        //navigate('/userlist');
      }
    /*function removeEntry(){
      var existingEntries = JSON.parse(localStorage.getItem("items"));
      if(existingEntries == null) existingEntries = [];
      localStorage.removeItem(JSON.stringify(inputs));
      //existingEntries.push(inputs);
      //delete existingEntries[key];

      localStorage.setItem("items", JSON.stringify(existingEntries));
    }*/
    const del = (event) =>{
        event.preventDefault();
        let existingEntries = JSON.parse(localStorage.getItem("items"))
        if(existingEntries == null) existingEntries = [];
        console.log("existing entries: ")
        console.log(props.listitem)
        console.table(existingEntries)
        console.log(existingEntries)
        let newarr = existingEntries.filter(
            (iterateitem) => (JSON.stringify(iterateitem) != JSON.stringify(props.listitem)
        ))

        console.log("after filtering, existing entries: ")
        console.table(newarr)
        localStorage.setItem("items", JSON.stringify(newarr))
        props.changelist(props.currentlist.filter(
            (iterateitem) => (iterateitem != props.listitem))
        )
        //props.changelist(newarr)
        props.func(false);
        console.log("delete item was called");
        //navigate('/userlist');
    }
      return (
        <>
        <h1>edit an item</h1>
        <form onSubmit={handlesubmit}>

      <label className="sec">Name:
      <input 
        type="text" 
        name="name" 
        //value={inputs.name || ""} 
          value = {inputs.name || ""}
        // value={props.details.name || "name"} 
        onChange={handleChange}
      />
      </label>
      <br></br>
      <label className="sec"> Category:
        <input 
          type="text" 
          name="category" 
          value={inputs.category || ""} 
          // value={props.details.category || ""} 
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
          name="expdatestr" 
          value={inputs.expdatestr || ""} 
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
          //value={inputs.notif || ""} 
          //value={props.details.notif || ""} 
          onChange={handleChange}
        />
        days before expiration
        </label>
        <br></br>

        <input type="submit" />
    </form>
    <div className = "navigation">
    <button onClick={cancel}>Cancel</button>
    <button onClick={del}>Delete Item</button>
    </div>
        </>
      );
}
export default GuestEdit;
