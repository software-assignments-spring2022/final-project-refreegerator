import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Create from './Create';
import Header from './Header'
import Footer from './Footer'
import UserList from "./UserList"
import GuestList from "./GuestList"
import SuggestedRecipes from "./SuggestedRecipes"
import Add from './Add'
import Edit from './Edit'
import Profile from "./Profile"
import Inspect from "./Inspect"
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path = "/SuggestedRecipes" element = {<SuggestedRecipes />}> </Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/Add" element={<Add />}></Route>
            <Route path="/Edit" element={<Edit />}></Route>
            <Route path= "/UserList" element = {<UserList />}> </Route>
            <Route path = "/GuestList" element = {<GuestList />}> </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/inspect" element={<Inspect />} />
          </Routes>
        </main>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
