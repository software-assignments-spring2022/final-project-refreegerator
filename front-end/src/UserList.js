import YourList from "./YourList"
import ListButtons from "./ListButtons"
import {useState, useEffect} from "react"
import Header from "./Header"
const UserList = props => {
  
    const [editAll, setEditAll] = useState(false)
    const placeholder = [
        {category : "Dairy",
            name : "Cheese",
            expdatestr : "3000-05-25"
        },
        {category : "Zed",
                name: "Bread",
                expdatestr : "5031-01-29"
        },
        {category : "Basket",
                name :"Alphabetical",
                expdatestr :"3020-01-01" ,
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
    let new_item = { name: "Potatoes", category: "Storage", expdatestr: "2020-02-02", quantity: 6}
    placeholder[0] = new_item;
    let profile_preferences = props.preferences || {
        notification_days: 5

    } 
    

    return(
        <>
            <Header
                    expiringItems = {placeholder}
                    profilePreferences = {profile_preferences} 

            />
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
export default UserList  
