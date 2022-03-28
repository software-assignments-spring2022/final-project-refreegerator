import { Link } from 'react-router-dom'

const ListButtons = (props) => {
    const manageEdit = () => {
        if (props.editAll == false) {
            console.log(props.editAll)
            props.setEditAll(true)
        }
        else props.setEditAll(false)
    }
    if (props.editAll == false){

        return(
            <div className= "navigation">
                <button onClick = {() => manageEdit()}type = "button"> Edit List</button>
                <Link to="/add"><button type = "button"> Add Item</button></Link>
            </div>
        )
    }
    if (props.editAll == true) {
        return(
            <div className= "navigation">
                <button onClick = {() => manageEdit()}type = "button"> Done Editing </button>
                <Link to="/add"><button type = "button"> Add Item</button></Link>
            </div>
        )
    }



}

export default ListButtons
