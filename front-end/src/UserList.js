import YourList from "./YourList"
import ListButtons from "./ListButtons"
import {useState, useEffect} from "react"
import axios from 'axios';
import { Navigate } from "react-router-dom"
// import { response } from "../../back-end/app";

const UserList = props => {
  
    const [editAll, setEditAll] = useState(false);
    const [items, setItems] = useState([]); 
    const [singleItem, setSingleItem] = useState(false);
    const [response, setResponse] = useState({}) 
    const jwtToken = localStorage.getItem("token")
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) 
    
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
        const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/userlist`, {
            headers: { Authorization: `JWT ${jwtToken}` }
        });
        console.log((response.data));
        setResponse(response.data); 
        setItems([...response.data.d_]);
    }
    catch(error){
        console.log('probably incorrect jwt token ');
        console.log(error);
        setIsLoggedIn(false);
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
        {isLoggedIn ? (
            <>
            <YourList placeholder = {items}
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
        ):(
            <Navigate to="/?error=protected" />
        )}
        </>
    )
}
export default UserList  
