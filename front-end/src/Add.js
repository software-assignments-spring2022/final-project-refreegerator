import { useState } from "react";
import './Add.css'
import { useNavigate } from 'react-router-dom';

const Add = props =>{
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setInputs(values => ({...values, [name]: value}));
        // console.log(inputs);
      }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        // localStorage.setItem('items', inputs);
        addEntry();
        navigate('/UserList');
    }
    //adding to localStorage
    function addEntry(){
      var existingEntries = JSON.parse(localStorage.getItem("items"));
      if(existingEntries == null) existingEntries = [];
      localStorage.setItem("item",JSON.stringify(inputs));
      existingEntries.push(inputs);
      localStorage.setItem("items", JSON.stringify(existingEntries));
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
        onChange={handleChange}
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
        <label className="sec"> Category:
        <select name="category" id="category" onChange={handleChange} value = {""}>
        <option value="Fruits">Fruits</option>
        <option value="Vegetable">Vegetable</option>
        <option value="Grains">Grains</option>
        <option value="Protein">Protein</option>
        <option value="Dairy">Dairy</option>
        </select>
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