import ReactDom from "react-dom";
import React from "react";
import ListItem from './ListItem'
import { useState, useEffect} from "react";
import Edit from "./Edit.js"
import Inspect from "./Inspect.js"
import {useLocation} from "react-router-dom"
import GuestAdd from "./GuestAdd.js"
import GuestEdit from "./GuestEdit.js"
const axios = require('axios');

const YourList = props => {
    const location = useLocation();
    const [sortpref, setSortPref] = useState(""); 
    props.setSingleItem(false)    
    const [orderedList, updateOrder] = useState([]);
    const [alreadyAdded, changeAdded] = useState(false); 
    let isGuest = true;
    if (isGuest in props) {
        

    }
    const placeholder = [
        {category: "Dairy",
            name: "Cheese",
            expdatestr: "3000-05-25"
        },
        {category: "Zed",
            name: "Bread",
            expdatestr: "1031-01-29"
        },
        {category: "Basket",
            name: "Alphabetical",
            expdatestr: "2020-01-01"
        }
    ]
    
    //const [propagate, setPropagate] = useState(props.
    //let addeditemlist = location.state.addeditemlist
    if (location.state != null && alreadyAdded == false){
        let {addeditemlist} = location.state
        let {addeditem} = location.state
        changeAdded(true)
    
//    if (addeditemlist != undefined) {
//        updateOrder(orderedList);
//    }
    
    //let specific_item = location.state
//    if (specific_item != null && alreadyAdded == false){
//        let new_arr = orderedList;
//        new_arr.push(specific_item)
//        updateOrder(specific_item)
//        changeAdded(true)
//
//    }
    if (addeditemlist != null) {
        console.log("the branch has been taken");
        console.log("received list has length: ");
        console.log(addeditemlist.length);
        console.log("original list has length: ");
        console.log(orderedList.length);
        if (addeditemlist.length > orderedList.length){
            console.log("adding the new item");
            let new_arr = orderedList;
            //new_arr.push(addeditem)
            updateOrder(addeditemlist)
            //updateOrder(new_arr);
            props.propagate(addeditemlist)
            
            setSortPref("foodcat")
            console.table(orderedList)
        }
    }
    }
    //console.table(orderedList)
    //console.table(addeditemlist)
    const [isEditing, editMode] = useState(false);
    const [isInspecting, inspectMode] = useState(false);
    const hasList = true;
    
    const handleSelect= async (item) => {
        setCurrent(item)
        inspectMode(true)
        
    };
    
    const [currentItem, setCurrent] = useState({})


    useEffect(() => {
      let  existingEntries = JSON.parse(localStorage.getItem("items"));
        //console.log("current localstorage is")
        //console.table(existingEntries)
        updateOrder(existingEntries)
    }, [props.placeholder]);
    
    const handleClick = (item) => {
        if (isEditing == false){
           //console.log("div was clicked")
           editMode(true);
            //console.table(item)

        }
        setCurrent(item)
    }
    const handleDelete = (item) =>{
        updateOrder(orderedList.filter( 
            (iterateitem) => (iterateitem !== item))
        )
        props.propagate(orderedList)
        let existingEntries = JSON.parse(localStorage.getItem("items"))
        if(existingEntries == null) existingEntries = [];
        console.log("existing entries: ")
        console.log(props.listitem)
        console.table(existingEntries)
        console.log(existingEntries)
        let newarr = existingEntries.filter(
            (iterateitem) => (JSON.stringify(iterateitem) != JSON.stringify(item)
        ))

        console.log("after filtering, existing entries: ")
        console.table(newarr)
        localStorage.setItem("items", JSON.stringify(newarr))
        //props.changelist(newarr)
        console.log("delete item was called");
        //navigate('/userlist');
    }

    const current = new Date();
    const days_until_spoil = (expdate) => {
        const msdiff = expdate - current
        return msdiff / (1000 * 60 * 60 * 24) 
    }
     //console.log(existingEntries)
    const handleSort = (event) => {
        //console.log(event.target.value)
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
            //console.table(newarray)
        }
        if (event.target.value == "foodcat"){
            newarray.sort((a,b) => {
                if (a.category <= b.category) {return -1}
                else {return 1}
            }
            ) 
            //console.table(newarray)
        }
        if (event.target.value == "name") {
            newarray.sort((a,b) => (a.name <= b.name) ? -1: 1);
            //console.table(newarray)
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
                                    {props.editAll && 
                                    <button onClick = {() => handleDelete(listitem)}> Delete </button>
                                    }
                                </div>
                                </>
                            )
                        )
                    }
                </>
                )

            }
            if (isEditing == true  && isInspecting == false){
                    console.log(editMode.toString()) 
                    console.log(isEditing)
                return (
                    
                    <GuestEdit func = {editMode} 
                        listitem = {currentItem}
                        changelist = {updateOrder}
                        currentlist = {orderedList}
                        setEditAll = {props.setEditAll}
                        setSingleItem = {props.setSingleItem}
                    />
                )
            }
            if (isInspecting == true && isEditing == false) {
                return (
                    <>
                    <Inspect listitem = {currentItem} 
                             inspectMode = {inspectMode}
                             editMode = {editMode}

                    />
                    
                    </>
                    


                )
            }

    }
    else{
        return <h1>Your list seems to be empty. Add an item!</h1>
    }
}

export default YourList
