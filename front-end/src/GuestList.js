import YourList from "./YourList"
import ListButtons from "./ListButtons"
import { useState, useEffect} from "react";

const GuestList = props => {

    const [editAll, setEditAll] = useState(false)
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
                expdatestr :"2020-01-01" ,
                quantity:5
        }
    ]
    const [items, setItems] = useState(placeholder)
    const [singleItem, setSingleItem] = useState(false);
    useEffect(() => {
        console.log("propagation has occurred")
        console.table(items)
    }
    )
    return(
        <>
            <YourList placeholder = {placeholder}
                      editAll = {editAll}                                 
                      propagate = {setItems}
                      setEditAll = {setEditAll}
                      setSingleItem = {setSingleItem}
            />
            <ListButtons 
                      editAll = {editAll}                                 
                      setEditAll = {setEditAll}
                      allItems = {items} 
                      singleItem = {singleItem}
            />
        </>
    )
}
export default GuestList
