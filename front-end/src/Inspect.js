import React from 'react'
import './Inspect.css'
import Item from "./Item"
import { Link } from 'react-router-dom'

const Inspect = () => {
  return (
    <>
        <Item
            name="Eggs"
            details="I bought my eggs from Eggs-R-Us instead of Eggs-Mart this time"
            quantity="2"
        />
        <div className='Recipes'>
            <b>Suggested Recipes</b>
        </div>
        <div className='Buttons'>
            <Link to="/userlist"><button className='buttons1'>Back</button></Link>
            <Link to="/edit"><button className='buttons1'>Edit Item</button></Link>
        </div>
    </>
  )
}

export default Inspect
