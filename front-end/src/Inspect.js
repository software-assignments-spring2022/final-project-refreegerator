import React from 'react'
import './Inspect.css'
import Item from "./Item"
import { Link } from 'react-router-dom'
import axios from 'axios'
const URL = "https://api.kroger.com/v1/"

const Inspect = (props) => {
    const editHandle = () =>{
        props.editMode(true)
        props.inspectMode(false)
    }
    const handleBack = () => {
        props.editMode(false)
        props.inspectMode(false)

    }

    const[post, setPost] = React.useState(null);

    React.useEffect(() => {
        axios.get(URL).then((response) => {
            setPost(response.data);
        });
    });
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
