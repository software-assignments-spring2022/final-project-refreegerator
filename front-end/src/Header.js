import './Header.css'
import logo from './logo.svg'
import { Link } from 'react-router-dom'

/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Header = props => {
  return (
    <header className="Header-header">
      <nav className="Header-navbar">
        <h2> ReFreegerator </h2>
          <img src={logo} className = "logo"  alt="ReFreegerator Logo" />
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
      </nav>
    </header>
  )
}

// make this component available to be imported into any other file
export default Header
