import React, {useEffect, useRef, useState} from 'react';
import "./Footer.css"
import {Link} from "react-router-dom";
import {MyWave} from "./MyWave";


function Footer() {
    const eleRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    const checkInView = () => {
        const rect = eleRef.current.getBoundingClientRect();
        setIsInView(rect.top < window.innerHeight && rect.bottom >= 0);
    };

    useEffect(() => {
        checkInView();
    }, []);

    useEffect(() => {
        document.addEventListener('scroll', checkInView);
        return () => {
            document.removeEventListener('scroll', checkInView);
        };
    }, []);


    useEffect(() => {
        if (isInView) {
            document.getElementById("waves").style.position = "fixed"
            console.log('Елемент у видимому полі');
        } else {
            document.getElementById("waves").style.position = "absolute"
            console.log('Елемент у no видимому полі');
        }
    }, [isInView]);

    return (
        <MyWave >
            <div className="footer-container" id='footer-container' ref={eleRef}>
                <div className='footer-links'>
                        <div className='footer-link-wrapper'>
                            <div className='footer-link-items'>
                                <h2>About Us</h2>
                                <Link to='/'>How it works</Link>
                                <Link to='/'>Careers</Link>
                                <Link to='/'>Investors</Link>
                                <Link to='/'>Terms of Service</Link>
                            </div>
                            <div className='footer-link-items'>
                                <h2>Contact Us</h2>
                                <Link to='/'>Contact</Link>
                                <Link to='/'>Support</Link>
                                <Link to='/'>Destinations</Link>
                                <Link to='/'>Sponsorships</Link>
                            </div>
                        </div>
                        <div className='footer-link-wrapper'>
                            <div className='footer-link-items'>
                                <h2>Videos</h2>
                                <Link to='/'>Ambassadors</Link>
                                <Link to='/'>Agency</Link>
                            </div>
                            <div className='footer-link-items'>
                                <h2>Social Media</h2>
                                <Link to='/'>Instagram</Link>
                                <Link to='/'>Facebook</Link>
                                <Link to='/'>Youtube</Link>
                            </div>
                        </div>
                    </div>
                <section className='social-media'>
                        <div className='social-media-wrap'>
                            <div className='footer-logo'>
                                <Link to='/' className='social-logo'>
                                    JPG <i className='fa fa-lock'/>
                                </Link>
                            </div>
                            <small className='website-rights'>JPG © 2024</small>
                            <div className='social-icons'>
                                <Link
                                    className='social-icon-link facebook'
                                    to='/'
                                    target='_blank'
                                    aria-label='Facebook'
                                >
                                    <i className='fab fa-facebook-f'/>
                                </Link>
                                <Link
                                    className='social-icon-link instagram'
                                    to='/'
                                    target='_blank'
                                    aria-label='Instagram'
                                >
                                    <i className='fab fa-instagram'/>
                                </Link>
                                <Link
                                    className='social-icon-link youtube'
                                    to='/'
                                    target='_blank'
                                    aria-label='Youtube'
                                >
                                    <i className='fab fa-youtube'/>
                                </Link>
                                <Link
                                    className='social-icon-link twitter'
                                    to='/'
                                    target='_blank'
                                    aria-label='Twitter'
                                >
                                    <i className='fab fa-twitter'/>
                                </Link>
                                <Link
                                    className='social-icon-link twitter'
                                    to='/'
                                    target='_blank'
                                    aria-label='LinkedIn'
                                >
                                    <i className='fab fa-linkedin'/>
                                </Link>
                            </div>
                        </div>
                    </section>
            </div>
        </MyWave>
    );
}

export default Footer;