import YourList from "./YourList"
import ListButtons from "./ListButtons"
import {useState, useEffect} from "react"

const UserList = props => {
    
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
    let new_item = { name: "Potatoes", category: "Storage", expdatestr: "2020-02-02", quantity: 6}
    placeholder[0] = new_item;
    

    return(
        <>
            <YourList placeholder = {placeholder}
                      editAll = {editAll}                                 
                      setEditAll = {setEditAll}
            />
            <ListButtons 
                      editAll = {editAll}                                 
                      setEditAll = {setEditAll}
                      allItems = {placeholder} 
            />
        </>
    )
}
export default UserList
