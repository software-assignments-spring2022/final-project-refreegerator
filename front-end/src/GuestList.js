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
    const [editAll, setEditAll] = useState(false)
    const [items, setItems] = useState(data)
    const [singleItem, setSingleItem] = useState(false);
    useEffect(() => {
        console.log("propagation has occurred")
        //console.table(items)
    }
    )
    return(
        <>
            <YourList placeholder = {items}
                      editAll = {editAll}                                 
                      propagate = {setItems}
                      setEditAll = {setEditAll}
                      setSingleItem = {setSingleItem}
                      isGuest = {true}
            />
            <ListButtons 
                      isGuest = {true}
                      editAll = {editAll}                                 
                      setEditAll = {setEditAll}
                      allItems = {items} 
                      singleItem = {singleItem}
            />
        </>
    )
}
export default GuestList
