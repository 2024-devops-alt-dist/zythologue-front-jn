// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/android-chrome-512x512.png'

const Navbar: React.FC = () => {
    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    // const toggleMenu = () => {
    //     setIsMenuOpen((prev) => !prev);
    // };

    return (

        <nav>
            <div className="navbar">
                <div className="container nav-container glass">
                    <input className="checkbox" type="checkbox" name="" id="menu-toggle"/>
                    <label htmlFor="menu-toggle" className="hamburger-lines">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </label>
                    <a href="https://jimmyni.fr" className="custom-logo-link" rel="home" aria-current="page">
                        <img width="240" height="237"
                             src={logo}
                             className="custom-logo" alt="Jimmy NI" decoding="async"/>
                    </a>
                    <ul id="menu-menu-principal" className="menu">
                        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-999">
                            <Link to="/beers" >
                                Beers
                            </Link>
                        </li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-999">
                            <Link to="/breweries" >
                                Breweries
                            </Link>
                        </li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-999">
                            <Link to="/favorites" >
                                Favorites
                            </Link>
                        </li>
                    </ul>
                    <div className="social-icons">
                        <a href="https://github.com/jimni6" target="_blank"><i className="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/jimmy-ni-a01159239/" target="_blank"><i
                            className="fab fa-linkedin"></i></a>
                        <a href="https://www.instagram.com/dev_with_jim/" target="_blank"><i
                            className="fab fa-instagram"></i></a>
                        <a href="https://discord.com/users/Jimmy NI#5975" target="_blank"><i
                            className="fab fa-discord"></i></a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;