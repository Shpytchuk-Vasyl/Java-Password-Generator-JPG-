import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Footer from "./components/Footer";
import SignUp from "./components/pages/SignUp";
import LogIn from "./components/pages/LogIn";
import Profile from "./components/pages/Profile";

import {Profiler} from "react";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign up" element={<SignUp />} />
                <Route path="/log in" element={<LogIn />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
