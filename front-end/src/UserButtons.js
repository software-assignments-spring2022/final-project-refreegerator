import { Link } from 'react-router-dom'

const UserButtons = () => {
    return(
        <div class = "navigation">
            <Link to="/profile"><button type = "button"> Profile </button></Link>
            <Link to="/"><button type = "button"> Log Out</button></Link>
            <Link to="/edit"><button type = "button"> Edit List</button></Link>
            <Link to="/add"><button type = "button"> Add Item</button></Link>
        </div>
    )



}

export default UserButtons
