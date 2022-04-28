import './Header.css'
import logo from './fridge.png'
import { Link } from 'react-router-dom'
import React from "react"
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Notification from './Notification'
import {useState, useEffect} from "react"
/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Header = (props) => {
  const [anchor, setAnchor] = React.useState(null);
  const [login, setLogin] = useState(false);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  const logout =() =>{
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setLogin(false);
  };
  const loggedin = localStorage.getItem("username");
    console.log(loggedin);
    if(loggedin!= null){
      setLogin(true);
      self.forceUpate();
      // this.forceUpdate();
    }
  /*
  useEffect(()=>{
    const loggedin = localStorage.getItem("username");
    console.log(loggedin);
    if(loggedin!= null){
      this.setState({ login : true })
      // setLogin(true);
      // this.forceUpdate();
    }
    //window.location.reload();
  },[]);*/
  return (
      <>
    <header className="Header-header">
      <img src = {logo} className = "logo" alt = "ReFreegerator Logo" />
      <h2> <Link to="/UserList" className='Refreegerator'> Refreegerator </Link> </h2>
      <>{login ? (
        <>
        <div id= "notifications">
        <Notification/>
      </div>    
     <div id="profile"> 
      <IconButton onClick={handleClick}><Avatar/> </IconButton>
        <Menu
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Link to="/profile" className='dropdownMenu'>
                <MenuItem>
                    <h4 >Settings</h4>
                </MenuItem>
            </Link>
            <MenuItem>
            <Link to="/" onClick = {logout} className='dropdownMenu'>
                  <h4 >Logout</h4>
            </Link>
            </MenuItem>
        </Menu>
        </div> 
        </>
      ):(
        <></>
      )}
      </>
        
    </header>
      </>
  )
}

// make this component available to be imported into any other file
export default Header
