import YourList from "./YourList"
import ListButtons from "./ListButtons"
import {useState, useEffect} from "react"
import axios from 'axios';
// import { response } from "../../back-end/app";

const UserList = props => {
  
    const [editAll, setEditAll] = useState(false);
    const [items, setItems] = useState([]); 
    const [singleItem, setSingleItem] = useState(false);

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
    
    useEffect(()=>{
        fetchData();
        // console.log("propagation has occurred")
        // console.table(items);
    }, []);

    return(
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
    )
}
export default UserList  
