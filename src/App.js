import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Navbar from "./components/completed/Navbar";
import Home from "./components/pages/Home";
import Footer from "./components/completed/Footer";
import SignUp from "./components/pages/SignUp";
import LogIn from "./components/pages/LogIn";
import Profile from "./components/pages/Profile";
import {useState} from "react";


function App() {
    let [isRegister, setRegister] = useState(false)

    return (
        <BrowserRouter>
            <Navbar id="main-nav" isRegister={isRegister} setRegister={setRegister}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign up" element={<SignUp setRegister={setRegister}/>} />
                <Route path="/log in" element={<LogIn setRegister={setRegister}/>} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
