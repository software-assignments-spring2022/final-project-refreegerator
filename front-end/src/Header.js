import './Header.css'
import logo from './fridge.png'
import profile from './profile.png'
import { Link } from 'react-router-dom'

/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Header = props => {
  return (
      <>
    <header className="Header-header">
      <img src = {logo} className = "logo" alt = "ReFreegerator Logo" />
      <h2> <Link to="/UserList" className='Refreegerator'> Refreegerator </Link> </h2>
        <span> </span>
        <Link to= "/profile" className = "profile"><img src={profile} className = "profile"  alt="Dropdown" /></Link>
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
        
          */}
      </>
  )
}

// make this component available to be imported into any other file
export default Header
