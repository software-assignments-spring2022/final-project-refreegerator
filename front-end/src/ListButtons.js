import { Link } from 'react-router-dom'

const ListButtons = () => {
    return(
        <div className= "navigation">
            <Link to="/edit"><button type = "button"> Edit List</button></Link>
            <Link to="/add"><button type = "button"> Add Item</button></Link>
        </div>
    )



}

export default ListButtons
