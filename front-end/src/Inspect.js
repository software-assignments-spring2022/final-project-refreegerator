import React from 'react'
import './Inspect.css'
import Item from "./Item"
import SuggestedRecipes from './SuggestedRecipes'

const Inspect = (props) => {
    const editHandle = () =>{
        props.editMode(true)
        props.inspectMode(false)
    }
    const handleBack = () => {
        props.editMode(false)
        props.inspectMode(false)

    } 
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
                <SuggestedRecipes itemname={props.listitem.name}/>
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
