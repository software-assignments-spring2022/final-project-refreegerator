import YourList from "./YourList"
import ListButtons from "./ListButtons"
import {useState, useEffect} from "react"

const GuestList = props => {
    
    var item = JSON.parse(localStorage.getItem('items'));
    const data = item.map(item => {
        const container = {};
        container.category = item.category;
        container.name = item.name;
        container.expdatestr = item.expdatestr;
        return container;
    });

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
                expdatestr :"2020-01-01" ,
                quantity:5
        }
    ]
    const [items, setItems] = useState(data)
    const [singleItem, setSingleItem] = useState(false);
    useEffect(() => {
        console.log("propagation has occurred")
        console.table(items)
    }
    )
    return(
        <>
            <YourList placeholder = {data}
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
