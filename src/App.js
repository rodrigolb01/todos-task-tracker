import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Items from "./components/Items";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Router>
        <div className="container">
        <Header/>
          <Routes>
            <Route path="/" element={ <Dashboard/> } />
            <Route path="/signin" element={ <SignIn/> } />
            <Route path="/signup" element={ <SignUp/> } />
            <Route path="/items" element={ <Items/> } />
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
