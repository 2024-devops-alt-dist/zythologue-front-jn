// Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [applyMediaStyles, setApplyMediaStyles] = useState<{ [key: string]: React.CSSProperties }>({});

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            setApplyMediaStyles(window.innerWidth <= 768 ? mediaStyles : {});
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial state

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav style={styles.navbar}>
            {/* LOGO */}
            <div style={styles.logo}>
                <Link to="/" style={styles.logoLink}>
                    🍺 Home
                </Link>
            </div>

            {/* MENU ICON (visible only on mobile) */}
            <div style={styles.menuIcon} onClick={toggleMenu}>
                {isMenuOpen ? '✖️' : '☰'}
            </div>

            {/* NAV LINKS */}
            <ul style={{ ...styles.navLinks, ...applyMediaStyles.navLinks, ...(isMenuOpen ? styles.navLinksOpen : {}) }}>
                <li>
                    <Link to="/beers" style={styles.link}>
                        Beers
                    </Link>
                </li>
                <li>
                    <Link to="/breweries" style={styles.link}>
                        Breweries
                    </Link>
                </li>
                <li>
                    <Link to="/favorites" style={styles.link}>
                        Favorites
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

// Inline Styles
const styles: { [key: string]: React.CSSProperties } = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#222',
        color: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    logoLink: {
        textDecoration: 'none',
        color: '#f5b50a',
    },
    menuIcon: {
        display: 'none',
        fontSize: '1.8rem',
        cursor: 'pointer',
    },
    navLinks: {
        display: 'flex',
        listStyleType: 'none',
        gap: '20px',
    },
    navLinksOpen: {
        display: 'block',
        position: 'absolute',
        top: '60px',
        left: '0',
        backgroundColor: '#222',
        width: '100%',
        textAlign: 'center',
        padding: '10px 0',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
        fontSize: '1.1rem',
    },
};

const mediaStyles: { [key: string]: React.CSSProperties } = {
    navLinks: {
        display: 'none',
    },
    menuIcon: {
        display: 'block',
    },
};

export default Navbar;