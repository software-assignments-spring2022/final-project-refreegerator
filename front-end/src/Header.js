import './Header.css'
import logo from './fridge.png'
import { Link } from 'react-router-dom'
import React from "react"
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useState, useEffect} from "react";
import {useLocation} from "react-router-dom"
/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Header = (props) => {
  //const location = useLocation();
  const [anchor, setAnchor] = React.useState(null);
  const [anchor2, setAnchor2] = React.useState(null);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  const handleClick2 = (event) => {
    setAnchor2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchor2(null);
  };
  const expiringItems = props.expiringItems || [];
    let preferences = props.profilePreferences;
    if (preferences == null ){
        preferences = {notification_days: 10}
    }
    let expdatepref = preferences.notification_days;
    console.log(expdatepref)
    console.log("loading header")
  return (
      <>
    <header className="Header-header">
      <img src = {logo} className = "logo" alt = "ReFreegerator Logo" />
      <h2>
        <div>
          <Link to="/UserList" 

                 className='Refreegerator'
                state={{ passpreferences:  preferences,
                         expiringItems: expiringItems
                         }}

      > Refreegerator </Link> 
        </div>
        </h2>
        <div id= "notifications">
        <NotificationsNoneIcon onClick={handleClick2} fontSize="large"></NotificationsNoneIcon>
        <Menu
              
              anchorEl={anchor2}
              open={Boolean(anchor2)}
              onClose={handleClose2}
              onClick={handleClose2}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {
                    expiringItems.map((listitem, i, holdarray) =>
                {
                            let current_date = new Date();
                            let item_date = Date.parse(listitem.expdatestr)
                            let date_diff = item_date - current_date;
                            date_diff = date_diff /(1000*60*60*24)
                            console.log (date_diff, expdatepref)
                           return (  (date_diff <= expdatepref)&&
                        <MenuItem>
                            <div>
                                <button onClick = {() => handleClick(listitem)} >
                                    {listitem.name} is close to expiring!
                                </button>
                            </div>
                        </MenuItem>
                
               )
                    
            }
                    )
            }
          </Menu>
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
              <Link to= "/profile"
                 className='Refreegerator'
                state={{ passpreferences:  preferences,
                         expiringItems: expiringItems         
                         }}
              >
                  <MenuItem>
                      <h4 >Settings</h4>
                  </MenuItem>
              </Link>
              <MenuItem>
              <Link to="/" className='dropdownMenu'>
                    <h4 >Logout</h4>
              </Link>
              </MenuItem>
          </Menu>
          </div> 
    </header>
    
          {/*
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/create"> Create An Account </Link>
          </li>
          <li className="nav-item">
            <Link to="/guest"> Continue As Guest </Link>
          </li>
        <li className = "nav-item">
            <Link to = "/"> [dropdown goes here] </Link>
        </li>
        </ul>
        // <Link to= "/profile" className = "profile"><img src={profile} className = "profile"  alt="Dropdown" /></Link>
          */}
      </>
  )
}

// make this component available to be imported into any other file
export default Header
