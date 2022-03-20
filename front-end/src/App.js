import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Create from './Create';
import Header from './Header'
import Footer from './Footer'
import SuggestedRecipes from "./SuggestedRecipes"

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
          </Routes>
        </main>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
