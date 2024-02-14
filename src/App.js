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


function App() {

    return (
        <BrowserRouter>

            <Navbar id="main-nav"/>
            <BackgroundImage>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign up" element={<SignUp/>} />
                    <Route path="/log in" element={<LogIn />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            <Footer/>
            </BackgroundImage>
        </BrowserRouter>
    );
}

export default App;
