import YourList from "./YourList"
import GuestButtons from "./GuestButtons"
import {useState, useEffect} from "react"
const GuestList = props => {
    
    var item = JSON.parse(localStorage.getItem('items'));
    let data = []
    //localStorage.setItem("username",null)//resetting the stored username if the user chooses the guest option
    localStorage.removeItem("username")
    if (item != null && item != undefined){
         data = item.map(item => {
            const container = {};
            container.category = item.category;
            container.name = item.name;
            container.expdatestr = item.expdatestr;
            return container;
        });
    }

    else item = []
    console.log("data is " , data)
    console.log("item is " , item)
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
            <GuestButtons 
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
