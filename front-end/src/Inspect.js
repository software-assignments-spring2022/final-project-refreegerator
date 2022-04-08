import React from 'react'
import './Inspect.css'
import Item from "./Item"
import { Link } from 'react-router-dom'
import axios from 'axios'
import data from './GSData.json'


const Inspect = (props) => {
    const editHandle = () =>{
        props.editMode(true)
        props.inspectMode(false)
    }
    const handleBack = () => {
        props.editMode(false)
        props.inspectMode(false)

    }
      /* please dont get rid of yet, may need for authentication
        const[post, setPost] = React.useState(null);

        React.useEffect(() => {
            axios.get(URL).then((response) => {
                setPost(response.data);
            });
        }); */


    /* things = data.map(item =>{
    const brand = item.brand
    const price = item.items.price
    } */
    fetch("GSData.json")
    .then(response => response.json())
    .then(json => console.log(json));
        
    
  return (
    <>
        <div>
        <Item
            name={props.listitem.name}
            details={props.listitem.info}
            quantity = {props.quantity}
        />
        <div className='Recipes'>
            <b>Suggested Recipes</b>
        </div>
        <div className='Stores'>
            <b>Stores</b>
            <div>response.price</div> 
        </div>
        <div className='Buttons'>
            <button onClick = {() => handleBack()}className='buttons1'>Back</button>
            <button onClick = {() => editHandle()}className='buttons1'>Edit Item</button>
        </div>
        </div>

    </>
  )

}

export default Inspect
