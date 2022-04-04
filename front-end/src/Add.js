import { useState } from "react";
import './Add.css'
import { useNavigate } from 'react-router-dom';
import {Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Autocomplete from '@mui/material/Autocomplete';
const Add = props =>{
    let currentdate = new Date();
    //console.log("hello")
    const location = useLocation();

    let {olditems} = location.state
    const [oldLength, setOldLength] = useState(olditems.length)
    const [newLength, setNewLength] = useState(olditems.length)
    const [itemList, setItemList] = useState(olditems)
    //console.log(olditems.length)
    const autocomplete_names = [
        "yogurt",
        "milk",
        "banana",
        "apple"
    ];
    const placeholder = [
        {name: "yogurt", days:14, category: "dairy"},
        {name: "milk", days: 10, category: "dariy"},
        {name: "banana", days: 7, category: "fruit"},
        {name: "apple", days: 9, category: "fruit"}

    ]
    const [inputs, setInputs] = useState({});
    const [autodate, setAutodate] = useState("");
    //const [allitems, setAllItems] = useState(props.allitems)
    const navigate = useNavigate();
    const autoComplete = (event, value) => {
        let foodname = "undefined"
        const currentname = event.target.name;
        //console.log(event.target.name);
        console.log(event, value)
        console.log(event.target.name)
        if (event.target.name == "name" || value != null){
             foodname = event.target.value;
            if (value != null) {
                foodname = value;
            }
             handleChange(event, value); 
        }
        //console.log(foodname);
        if (autocomplete_names.includes(foodname)){
            console.log("success");
            //event.target.name = "expdatestr";
            placeholder.forEach(auto_item =>
                {
                    if (auto_item.name == foodname){
                       //if (event.target.name = "ex_date"){
                           //handleChange(event);
                           console.log("ex date = true");
                           console.log(auto_item);
                           console.log(currentdate);
                            //if (event.target.value == ""){
                                let newdate =  new Date();
                                newdate.setDate(currentdate.getDate() + auto_item.days)
                                const newdatestr = newdate.toLocaleDateString('en-CA');
                                const newcategory = auto_item.category
                                //event.target.value = newdatestr;
                                console.log("current date is: ");
                                console.log(currentdate);
                                console.log("new date is: ");
                                console.log(newdatestr);
                                console.log(event.target.value);
                                //handleChange(event);
                                setInputs(values => ({...values, "expdatestr": newdatestr}))
                                //setInputs(values => ({...values, "category": newcategory}))

                            //event.target.name = currentname; 
                            //}

                       //}

                    }
                }
            )
            event.target.name = currentname;
        }
    }
    const handleChange = (event, value) => {
        console.log(event, value)
        let  name = event.target.name;
        let  newval = event.target.type === 'checkbox' ? event.target.checked : event.target.value;;
        if (value != null) {
           newval = value 
           name = "name"
            console.log(newval)
        }
        setInputs(values => ({...values, [name]: newval}))
        //console.log(olditems.length);
        if (oldLength == newLength){
            console.log("the lengths are equal");
            setNewLength(oldLength+1)
            setOldLength(-1)
            olditems.push(inputs)
            setItemList(olditems)
        }
        else{
            olditems[newLength-1] = inputs;
            setItemList(olditems);
        }
      }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        //navigate('/UserList');
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
            <label className = "sec"> Name:{' '}
<Autocomplete
        id="autosuggest_names"
        freeSolo
        options={(autocomplete_names)}
        value = {inputs.name || ""}
        name = "name"
        onInputChange= {(event,value)  => autoComplete(event, value)}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input type="text"  
                   {...params.inputProps}

              />
          </div>
        )}
                />
            </label>
            {/*
      <label className="sec">Name:
      <input 
        type="text" 
        name="name" 
        value={inputs.name || ""} 
        onChange={autoComplete}
      />
      </label>
      */}
      <label className="sec">Category:
      <input 
        type="text" 
        name="category" 
        value={inputs.category || ""} 
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
          name="expdatestr" 
          value={inputs.expdatestr || ""} 
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
            {/*<input type="submit" />*/ }

            {/*<Link to = {{pathname: "/UserList", state: {placeholder : olditems}}}>*/}
            <Link to = "/UserList" state = {{addeditemlist: itemList,

                                    addeditem:inputs
                }}>
                <button > Submit </button>
                {/*specific_item: inputs*/}
            </Link>
    </form>
            
    <button onClick={cancel}>Cancel</button>
        </>
      );
}
export default Add;
