import YourList from "./YourList"
import ListButtons from "./ListButtons"
import {useState, useEffect} from "react"
import axios from 'axios';
// import { response } from "../../back-end/app";

const UserList = props => {
  
    const [editAll, setEditAll] = useState(false);
    const [items, setItems] = useState([]); 
    
    
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
                expdatestr :"2020-01-01" 
        }
    ];
    /*
    async function fetchData() {

        let res = await axios
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/userlist`)
        
        .then(function(response) {
            
        })
        .catch(err => {
            console.log(`error error error! ${err}`)
        })
        let d = await res.data;
        setItems([...items, d]);
    }

    useEffect(()=>{
        fetchData();
        
        console.log(items, 0);
    }, [])
*/

const fetchData = async() => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/userlist`);
        console.log(response.data); 
        setItems([...response.data]);
    }
    catch(error){
        console.log(error);
    }
};
    
    useEffect(()=>{
        fetchData();
        // axios
        // .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/userlist`)
        // .then((response) => {
            
        //     // console.log(response.data);
        //     // setItems(response.data);
        //     setItems([...items, response.data]);    
        //     console.log(items);
        // })
        // .catch(err => {
        //     console.log(`error error error! ${err}`)
        // })
    }, []);



    return(
        <>
            <YourList placeholder = {items}
                      editAll = {editAll}                                 
                      setEditAll = {setEditAll}
            />
            <ListButtons 
                      editAll = {editAll}                                 
                      setEditAll = {setEditAll}
            />
            <p>{JSON.stringify(items)} </p>
        </>
    )
}
export default UserList  
