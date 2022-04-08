import YourList from "./YourList"
import ListButtons from "./ListButtons"
import {useState, useEffect} from "react"
import Header from "./Header"
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
                        expiringItems = {placeholder}
                        profilePreferences = {profile_preferences}
            />
            <ListButtons 
                      editAll = {editAll}                                 
                      setEditAll = {setEditAll}
                      allItems = {items} 
                      singleItem = {singleItem}
                      expiringItems = {placeholder}
                      profilePreferences = {profile_preferences}
            />
        </>
    )
}
export default GuestList
