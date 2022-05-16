import { Link } from 'react-router-dom'

const UserButtons = (props) => {
    const manageEdit = () => {
        if (props.editAll == false) {
    //        console.log(props.editAll)
            props.setEditAll(true)
        }
        else props.setEditAll(false)
    }
    const itemlist = props.allItems;
    //console.table(itemlist);
    //console.log(itemlist.length);
    if(props.singleItem == false){


    if (props.editAll == false){

        return(
            <div className= "navigation">
                <button onClick = {() => manageEdit()}type = "button"> Edit List</button>
                {// <Link to={{pathname: "/add", state: {allitems: itemlist}}} >
                   }
                <Link to = "/add" state= {{olditems:itemlist}}>
                <button type = "button"> Add Item</button>
                </Link>
            </div>
        )
    }
    if (props.editAll == true) {
        return(
            <div className= "navigation">
                <button onClick = {() => manageEdit()}type = "button"> Done Editing </button>
                <Link to="/add"
                    state= {{olditems:itemlist}}

                ><button type = "button"> Add Item</button></Link>
            </div>
        )
    }



    }

        else return (<>  </>)

}

export default UserButtons
