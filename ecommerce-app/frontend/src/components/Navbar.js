import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    ShopEase
                </Link>

                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/cart" className="nav-link">Cart</Link>
                    {user ? (
                        <>
                            <span className="nav-user">Hello, {user.name}</span>
                            <button onClick={logoutHandler} className="nav-logout">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;