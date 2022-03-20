import Recipe from "./Recipe";
import ReactDom from "react-dom";
import React from "react";
const placeholder = [
    {title: "Recipe 1",
     body: "This is the body of recipe 1" 
    },
    {title: "Recipe 2", 
     body: "This is the body of recipe 2"
     }
]
const SuggestedRecipes = (props )=> {
    let thisitem = props.itemname
    if (thisitem == null) {
        thisitem = "no item specified"
    }
    return(
        <>
            <h1> Suggested Recipes: {thisitem} </h1>
            {placeholder.map((listitem, i, holdarray) =>
                ( 
                    <>
                        <Recipe 
                            title = {listitem.title}
                            body = {listitem.body}
                            />
                    </>
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
