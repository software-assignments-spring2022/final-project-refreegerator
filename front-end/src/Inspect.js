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
    const fetchZip = async() => {
        try {
          console.log(username);
            await axios
              .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/profileform`, {params:{username: username}})
              .then((response) =>{
                zip = response.data.zipCode
              })
              .catch(err =>{
                console.log(err)
              })
        }
        catch(error){
            console.log(error);
      
        }
        useEffect(()=>{
          fetchZip();
            }, [])
    const showStore = () => {
        axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/kroger`, {
            itemName: props.listitem.name,
            zipCode: zip
          })
          .then(response => {
          })
          .catch(err => {
            console.log('error')
          })

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
            <div>
                <b>Nearby Stores</b>
                showStore()
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
