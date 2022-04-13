import Recipe from "./Recipe";
import { useState, useEffect} from "react";
import ReactDom from "react-dom";
import React from "react";
import {recipedata}  from './recipes';
const axios = require('axios');

// const placeholder = [
//     {title: "Recipe 1",
//      body: "This is the body of recipe 1" 
//     },
//     {title: "Recipe 2", 
//      body: "This is the body of recipe 2"
//      }
// ]

const SuggestedRecipes = (props )=> {
    const [backRec, setBackRec] = useState([])

    const getRecipes = async (itemname) => {
        console.log(itemname);
        //here
        const res = await axios.get(`http://localhost:3001/UserList?itemName=${itemname}`);
        // console.log("Here bozo 1");
        // console.log(JSON.stringify(res, null, 2))
        if (res.data && res.data[0] && res.data[0].recipes) {
            console.log(`Hey Bozo!`)
            console.log(JSON.stringify(res.data[0].recipes, null, 2))
            setBackRec(res.data[0].recipes);
        }
        else {
            console.log(`OH NO Bozo!`)
            console.log(JSON.stringify(res.data, null, 2))
        }
        //res.result should be where the json is?
        // console.log(res.text);
        // return backRec;
    };   

    let thisitem = props.itemname
    
    // run this once when component first loads
    useEffect(()=> {

        getRecipes(thisitem);
        
    }, []);

    // console.log(res);
    if (thisitem == null) {
        thisitem = "no item specified"
    }
    return(
        <>
            <h1> Suggested Recipes: {thisitem} </h1>
            {backRec.map((data, key) =>
                (
                    <Recipe 
                        title = {data.title}
                        body = {data.body}
                        key = {key}
                        />
                )
            )
            }
            <div class = "navigation">
                <button type = "button"> Back </button>
                <button type = "button"> Home </button>
            </div>
        </>
    )
}
export default SuggestedRecipes
