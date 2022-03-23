import './Header.css'
import logo from './fridge.png'
import { Link } from 'react-router-dom'
import React from "react"
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Header = () => {
  const [anchor, setAnchor] = React.useState(null);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  return (
      <>
    <header className="Header-header">
      <img src = {logo} className = "logo" alt = "ReFreegerator Logo" />
      <h2> <Link to="/UserList" className='Refreegerator'> Refreegerator </Link> </h2>
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
              <Link to="/profile">
                  <MenuItem>
                      <h4 style={{textDecoration:`none`}}>Settings</h4>
                  </MenuItem>
              </Link>
              <MenuItem>
              <Link to="/">
                    <h4 style={{textDecoration:`none`}}>Logout</h4>
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
