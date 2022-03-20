import ReactDom from "react-dom";
import React from "react";
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
//idea: have the props contain an array of objects
//like the placeholder variable above, and iterate
//through each object, presenting it as a 
//ListItem component
//
const YourList = props => {
    const hasList = true
    //const hasList = ;
        if (hasList) {
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
        </>
        )
    }
    else{
        return <h1>Your list seems to be empty. Add an item!</h1>
    }
}
export default YourList
