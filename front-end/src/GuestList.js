import YourList from "./YourList"
import ListButtons from "./ListButtons"
import {useState, useEffect} from "react"

const GuestList = props => {
    
    var items = JSON.parse(localStorage.getItem('items'));
    const data = items.map(item => {
        const container = {};
        container.category = item.category;
        container.name = item.name;
        container.expdatestr = item.ex_date;
        return container;
    });
    console.log(Array.isArray(data));
    console.log(data);
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
            <YourList placeholder = {data}
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
