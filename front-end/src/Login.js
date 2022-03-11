import { Link } from 'react-router-dom'
import './Login.css'
import UserList from "./UserList"
import GuestList from "./GuestList"

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Login = props => {
  return (
    <>
      <h1>Hello and welcome!</h1>
      <p>This is a full MERN-stack app, whether you like it or not!</p>
      <p>
          New User? <Link to="/create">Create an account</Link> or <Link to= "/GuestList"  >continue as a guest</Link>.
      </p>
        
    </>
  )
}

// make this component available to be imported into any other file
export default Login
