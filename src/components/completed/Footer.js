import React, {useEffect, useRef, useState} from 'react';
import "./Footer.css"
import {Link} from "react-router-dom";
import {MyWave} from "./MyWave";


function Footer() {
    const [scrollHeight, setScrollHeight] = useState(100);

    useEffect(() => {
        const handleScroll = () => {
            const footerContainer = document.getElementById('footer-container');
            const footerHeight = footerContainer.clientHeight;
            const scrollPosition = window.scrollY;
            const totalPageHeight = document.documentElement.clientHeight;

            console.log("footer "+ footerHeight);
            console.log("scroll " + scrollPosition);
            console.log("total " + totalPageHeight);

            if (totalPageHeight + 300 < scrollPosition) {
                setScrollHeight((totalPageHeight + footerHeight) -scrollPosition + 200);
            } else {
                setScrollHeight(footerHeight - 200);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <MyWave scrollHeight={`${scrollHeight}px`}>
            <div className="footer-container" id='footer-container'>
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

/*

<!-- index.html
<html> <head>
<--
<link rel="stylesheet" href="styles.css" />
</head>
<body>
<footer>

<section>
<ul class="socials">
<li><a class="fa-brands fa-facebook"></a></li> <li><a class="fa-brands fa-twitter"></a></li> <li><a class="fa-brands fa-linkedin"></a></li> <li><a class="fa-brands fa-instagram"></a></li> </ul>
<ul class="links">
<li><a>Home</a></li>
<li><a>About</a></li>
<li><a>Services</a></li>
<li><a>Team</a></li>
<li><a>Contact</a></li>
</ul>
<p class="legal">© 2023 All rights reserved</p>
</section>
</footer>
</body>
</html>
* */


    export default Footer;