//import "./Notification.css"
import React from "react"
import axios from "axios"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useState, useEffect} from "react"

const Notification = notifications => {
  const [anchor2, setAnchor2] = React.useState(null);
  const handleClick2 = (event) => {
    setAnchor2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchor2(null);
  };
  const [items, setItems] = useState([]); 

const fetchData = async() => {
  try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/userlist`);
      setItems([...response.data]);
  }
  catch(error){
      console.log(error);
  }
};
  
  useEffect(()=>{
      fetchData();
  }, []);
  console.log(items)
  let notifs = []
  for (let i =0; i<items.length; i++){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    today= Date.parse(today);
    let expDate = Date.parse(items[i].expdatestr)
    const day = 1000 * 60 * 60 * 24;
    let difference = Math.round((expDate - today)/(day));
    if (difference > 0 && difference < 5){
      items[i].daysLeft = difference
      notifs.push(items[i])
    }
  }  
  
  return (
    <>
    <NotificationsNoneIcon onClick={handleClick2} fontSize="large"></NotificationsNoneIcon>
        <Menu
              anchorEl={anchor2}
              open={Boolean(anchor2)}
              onClose={handleClose2}
              onClick={handleClose2}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {notifs.map((notification, i) => (
              <MenuItem>
                <h6>{notification.name} is expiring in {notification.daysLeft} days!</h6>            
              </MenuItem>
            ))}
        </Menu>
    </>
  )
}

export default Notification
