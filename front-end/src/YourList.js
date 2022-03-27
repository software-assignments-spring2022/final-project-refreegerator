import ReactDom from "react-dom";
import React from "react";
import ListItem from './ListItem'
import { useState, useEffect} from "react";
import Edit from "./Edit.js"
import Inspect from "./Inspect.js"
const placeholder = [
    {category : "Dairy",
        name : "Cheese",
        expdatestr : "3000-05-25"
    },
    {category : "Zed",
            name: "Bread",
            expdatestr : "1031-01-29"
    },
    {category : "Basket",
            name :"Alphabetical",
            expdatestr :"2020-01-01" 
    }
]
const YourList = props => {
    const [sortpref, setSortPref] = useState(""); 
    const [orderedList, updateOrder] = useState(placeholder);
    const [isEditing, editMode] = useState(false);
    const [isInspecting, inspectMode] = useState(false);
    const hasList = true;
    const handleSelect= (item) => {
        setCurrent(item)
        inspectMode(true)
    };
    const [currentItem, setCurrent] = useState({})
    const handleClick = (item) => {
        if (isEditing == false){
           console.log("div was clicked")
           editMode(true);
            console.table(item)

        }
        setCurrent(item)
    }

    const current = new Date();
    const days_until_spoil = (expdate) => {
        const msdiff = expdate - current
        return msdiff / (1000 * 60 * 60 * 24) 
    }
    const handleSort = (event) => {
        console.log(event.target.value)
        const newarray = [...orderedList]
        if (event.target.value == "closetospoil") {
        newarray.sort((a,b) => {
            const a_date = new Date(a.expdatestr)
            const b_date = new Date(b.expdatestr)
            const a_spoil = days_until_spoil(a_date)
            const b_spoil = days_until_spoil(b_date)
            if (a_spoil <= b_spoil) {return -1}
            else {return 1}
        }
        )
        console.table(newarray)
        }
        if (event.target.value == "dateadded"){
            newarray.sort((a,b) => {
                const a_date = new Date(a.expdatestr) 
                //todo:replace expdatestr with
                // "date added" when that info is available
            const b_date = new Date(b.expdatestr)
            if (a_date - b_date <= 0) {return -1}
            else {return 1}
            }
            )
            console.table(newarray)
        }
        if (event.target.value == "foodcat"){
            newarray.sort((a,b) => {
                if (a.category <= b.category) {return -1}
                else {return 1}
            }
            ) 
            console.table(newarray)
        }
        if (event.target.value == "name") {
            newarray.sort((a,b) => (a.name <= b.name) ? -1: 1);
            console.table(newarray)
        }
            updateOrder(newarray)
    }
   let newlist = orderedList; 
        if (hasList) {
            if (isEditing == false && isInspecting == false) {
                return (
                <>
                    <h1> Your List </h1>
                    <label htmlFor="sortpref">Sort by:</label>
                    <select  onChange = {handleSort} name ="sorting preference" id="sortpref" >
                      <option value="closetospoil">Closest to Spoiling</option>
                        {// <option value="dateadded">Date Added</option>
                         //this option can be added back when we get json objects with actual data;
                            //as of this comment, the placeholders don't contain that data, so i've commented it
                            //out for now
                        }
                      <option value="foodcat">Category</option>
                      <option value = "name"> Item Name </option>
                    </select>
                    {
                    orderedList.map((listitem, i, holdarray) =>

                            (
                                <>
                                < div key = {JSON.stringify(listitem)}
                                    onClick = {() => handleSelect(listitem)}
                                >
                   <ListItem key ={JSON.stringify(listitem)}                   
                         content = {JSON.stringify(listitem)}                    
                           category = {listitem.category}
                           name = {listitem.name}
                           expdatestr = {listitem.expdatestr}
                       />
                                </div> 
                                <div>
                                    <button onClick = {() => handleClick(listitem)} >
                                        Edit This Item
                                    </button>
                                </div>
                                </>
                            )
                        )
                    }
                </>
                )

            }
            if (isEditing == true && isInspecting == false){
                    console.log(editMode.toString()) 
                    console.log(isEditing)
                return (
                    
                    <Edit func = {editMode} 
                        listitem = {currentItem}
                        changelist = {updateOrder}
                        currentlist = {orderedList}
                    />
                )
            }
            if (isInspecting == true && isEditing == false) {
                return (
                    <Inspect listitem = {currentItem} 
                             inspectMode = {inspectMode}
                             editMode = {editMode}

                    />


                )
            }

    }
    else{
        return <h1>Your list seems to be empty. Add an item!</h1>
    }
}
export default YourList
