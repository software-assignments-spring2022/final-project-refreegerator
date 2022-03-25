import ReactDom from "react-dom";
import React from "react";
import ListItem from './ListItem'
import { useState, useEffect} from "react";
const placeholder = [
    {category : "Dairy",
        name : "Cheese",
        expdatestr : "1/27/3000"
    },
    {category : "Zed",
            name: "Bread",
            expdatestr : "1/29/1031"
    },
    {category : "Basket",
            name :"Alphabetical",
            expdatestr :"1/1/2020" 
    }
]
const YourList = props => {

    const [sortpref, setSortPref] = useState(""); 
    const [orderedList, updateOrder] = useState(placeholder);
    const hasList = true;
    const handleSelect= (event) => {
        setSortPref(event.target.value)
    };
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
               <ListItem key ={JSON.stringify(listitem)}                   
                         content = {JSON.stringify(listitem)}                    
                   category = {listitem.category}
                   name = {listitem.name}
                   expdatestr = {listitem.expdatestr}
               />
                    
                    )
                )
            }
        </>
        )
    }
    else{
        return <h1>Your list seems to be empty. Add an item!</h1>
    }
}
export default YourList
