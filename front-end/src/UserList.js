import YourList from "./YourList"
import ListButtons from "./ListButtons"
import {useState, useEffect} from "react"
import axios from 'axios';
// import { response } from "../../back-end/app";

const UserList = props => {
  
    const [editAll, setEditAll] = useState(false);
    const [items, setItems] = useState([]); 
    const [singleItem, setSingleItem] = useState(false);
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

const fetchData = async() => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/userlist`);
        console.log(typeof(response.data)); 
        setItems([...response.data]);
    }
    catch(error){
        console.log(error);
    }
};
    


    let new_item = { name: "Potatoes", category: "Storage", expdatestr: "2020-02-02", quantity: 6}
    placeholder[0] = new_item;
    
    useEffect(()=>{
        fetchData();
        // console.log("propagation has occurred")
        // console.table(items);
    }, []);

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
export default UserList  
