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
import {BackgroundImage} from "./components/completed/BackgroundImage";
import {ToastContainer} from "react-toastify";
import React, {useState} from "react";


function App() {
    const [user, setUser] = useState()
    return (
        <BrowserRouter>

            <Navbar id="main-nav"/>
            <BackgroundImage>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign up" element={<SignUp/>} />
                    <Route path="/log in" element={<LogIn />} />
                    <Route path= {user === null ? "/sign up" : "/profile"} element={<Profile />} />
                </Routes>
            <Footer/>
            </BackgroundImage>
            <ToastContainer/>
        </BrowserRouter>
    );
}

export default App;
