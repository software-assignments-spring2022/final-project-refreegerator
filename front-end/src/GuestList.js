import YourList from "./YourList"
import ListButtons from "./ListButtons"
import {useState, useEffect} from "react"

const GuestList = props => {
    
    var i = localStorage.getItem('item');
    console.log(i);
    var is = JSON.parse(localStorage.getItem('items'));
    console.log(is);
    console.log(typeof(is));
    // console.log(item.map(i => i.name));

    const [editAll, setEditAll] = useState(false)
    const placeholder = [
        {category : "Dairy",
            name : "Cheese",
            // name: is.map(i, e => i.name, i.ex_date),
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

    return(
        <>
            <YourList placeholder = {placeholder}
                      editAll = {editAll}                                 
                      setEditAll = {setEditAll}
            />
            <ListButtons 
                      editAll = {editAll}                                 
                      setEditAll = {setEditAll}
            />
        </>
    )
}
export default GuestList
