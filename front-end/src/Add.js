import { useState, useEffect} from "react";
import './Add.css'
import { useNavigate } from 'react-router-dom';
import {Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Autocomplete from '@mui/material/Autocomplete';
import Header from "./Header"
import axios from "axios"

const Add = props =>{
    let currentdate = new Date();
    //console.log("hello")
    const location = useLocation();
//
                        //expiringItems : props.expiringItems,
                        //profilePreferences : props.profile_preferences
    let {olditems} = location.state
    let {expiringItems} = location.state
    let {profilePreferences} = location.state
    const [oldLength, setOldLength] = useState(olditems.length)
    const [newLength, setNewLength] = useState(olditems.length)
    const [itemList, setItemList] = useState(olditems)
    const [update, forceUpdate] = useState(false)
    //console.log(olditems.length)
    const autocomplete_names = [
        "yogurt",
        "milk",
        "banana",
        "apple",
        "fish",
        "ground meat",
        "hot dogs",
        "beef, lamb, pork, steaks, roasts",
        "pork",
        "shrimp",
        "beef",
        "chicken",
        "berries",
        "broccoli",
        "spinach",
        "variety meats",
        "cooked meats",
        "citrus fruits",
        "grapes",
        "melons",
        "peaches and nectarines",
        "pears and plums",
        "beans",
        "cauliflower",
        "cabbage",
        "carrots",
        "cucumbers",
        "eggplant",
        "garlic",
        "ginger",
        "herbs",
        "lettuce",
        "mushroom",
        "onion",
        "tomatoe",
        "burrito",
        "sandwich",
        "cheese",
        "salad",
        "cake",
        "egg",
        "tofu",
    ];
    const placeholder = [
        {name: "yogurt", days:14, category: "dairy"},
        {name: "milk", days: 10, category: "dairy"},
        {name: "banana", days: 2, category: "fruit"},
        {name: "apple", days: 21, category: "fruit"},
        {name: "fish", days: 2, category: "protein"},
        {name: "ground meat", days: 2, category: "protein"},
        {name: "hot dogs", days: 14, category: "protein"},
        {name: "beef, lamb, pork, steaks, roasts", days: 3, category: "protein"},
        {name: "pork", days: 3, category: "protein"},
        {name: "shrimp", days: 2, category: "protein"},
        {name: "beef", days: 2, category: "protein"},
        {name: "chicken", days: 3, category: "protein"},
        {name: "berries", days: 2, category: "fruit"},
        {name: "broccoli", days: 7, category: "vegetable"},
        {name: "spinach", days: 3, category: "vegetable"},
        {name: "variety meats", days: 3, category: "protein"},
        {name: "cooked meats", days: 4, category: "protein"},
        {name: "citrus fruits", days: 14, category: "fruit"},
        {name: "grapes", days: 7, category: "fruit"},
        {name: "melons", days: 2, category: "fruit"},
        {name: "peaches and nectarines", days: 4, category: "fruit"},
        {name: "pears and plums", days: 4, category: "fruit"},
        {name: "beans", days: 4, category: "vegetable"},
        {name: "cauliflower", days: 5, category: "vegetable"},
        {name: "cabbage", days: 14, category: "vegetable"},
        {name: "carrots", days: 21, category: "vegetable"},
        {name: "cucumbers", days: 5, category: "vegetable"},
        {name: "eggplant", days: 4, category: "vegetable"},
        {name: "garlic", days: 14, category: "vegetable"},
        {name: "ginger", days: 14, category: "vegetable"},
        {name: "herbs", days: 10, category: "vegetable"},
        {name: "lettuce", days: 14, category: "vegetable"},
        {name: "mushroom", days: 3, category: "vegetable"},
        {name: "onion", days: 14, category: "vegetable"},
        {name: "tomatoe", days: 3, category: "vegetable"},
        {name: "burrito", days: 4, category: ""},
        {name: "sandwich", days: 14, category: ""},
        {name: "cheese", days: 21, category: "dairy"},
        {name: "salad", days: 5, category: "vegetable"},
        {name: "cake", days: 7, category: "dairy"},
        {name: "egg", days: 35, category: "vegetable"},
        {name: "tofu", days: 21, category: "vegetable"}

    ]
    const [inputs, setInputs] = useState({});
    const [autodate, setAutodate] = useState("");
    //const [allitems, setAllItems] = useState(props.allitems)
    const navigate = useNavigate();
    useEffect(() => {
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
                    },[inputs])
    const autoComplete = async (event, value) =>  { 
        let foodname = "undefined"
        const currentname = event.target.name;
        //console.log(event.target.name);
        console.log(event, value)
        console.log(event.target.name)
        if (event.target.name == "name" || value != null){
             foodname = event.target.value;
            if (value != null) {
                foodname = value;
                handleChange(event, foodname); 
            }
            else {

                //handleChange(event)
            }
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
                                 setInputs(values =>  ({...values, "expdatestr": newdatestr}), console.log(inputs))
                                 
                                 setInputs(values =>  ({...values, "name": foodname}), console.log(inputs))
                                 //setInputs(values => ({...values, "": ""}))
                                //setInputs(values => (values['expdatestr'] = newdatestr))
                                setInputs(values => ({...values, "category": newcategory}))

                            //event.target.name = currentname; 
                            //}

                       //}

                    }
                }
            )
            //event.target.name = currentname;
            //handleChange(event, value)
            handleChange(event, value)
        }
    }
    const handleChange = (event, value) => {
        console.log(event, value)
        let  newname = event.target.name;
        let newval = ""
          newval = event.target.type === 'checkbox' ? event.target.checked : event.target.value;;
        if (value != null) {
           newval = value 
           newname = "name"
           console.log(newval)
           setInputs(values => ({...values, "name": newval}))
            //setInputs(values => ({...values, "": ""}))
        }
        else{
             setInputs(values => ({...values, [event.target.name]: newval}))
        }
        //setInputs(values => ({...values, [newname]: newval}))
       
        //setInputs(values => (values[newname]= newval))
        console.table(inputs)
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
/*
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;;
        setInputs(values => ({...values, [name]: value}));
        // console.log(inputs);
        */
      }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        //navigate('/UserList');
        // localStorage.setItem('items', inputs);
        //addEntry();
        //navigate('/UserList');
        addEntry();
        axios
        .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/add/save`, {
          inputs: inputs
        })
        .then(response => {
        })
        .catch(err => {
          console.log('error')
        })
        navigate('/UserList');

    }
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
            <Header
                expiringItems = {expiringItems}
                profilePreferences = {profilePreferences}
            />
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
        //onChange = {(event,value) => autoComplete(event,value)}
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
