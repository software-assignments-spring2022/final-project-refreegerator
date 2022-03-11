import ReactDom from "react-dom";
import React from "react";
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap";
import ListItem from './ListItem'


const placeholder = [
    {category : "Dairy",
        name : "Cheese",
        expdatestr : "1/27/3000"
    },
    {category : "Pantry",
            name: "Bread",
            expdatestr : "1/29/3031"
    }
]

const YourList = props => {
    const hasList = true
    //const hasList = ;
    if (hasList){
        return (
        <>
            <h1> Your List </h1>
            <label for="sortpref">Sort by:</label>

            <select name="sorting preference" id="sortpref">
              <option value="closetospoil">Closest to Spoiling</option>
              <option value="dateadded">Date Added</option>
              <option value="foodcat">Category</option>
            </select>
            {placeholder.map((listitem, i, holdarray) =>
                    (
               <ListItem 
                   category = {listitem.category}
                   name = {listitem.name}
                   expdatestr = {listitem.expdatestr}
               />
            ))}
            
            <div class = "navigation">
                <button type = "button"> Profile </button>
                <button type = "button"> Log Out</button>
                <button type = "button"> Edit List</button>
                <button type = "button"> Add Item</button>
            </div>
        </>
        )
    }
    else{
        return <h1>Your list seems to be empty. Add an item!</h1>
    }
}
export default YourList
