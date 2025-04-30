// import { useImperativeHandle } from 'react'
// import './Navbar.css'
// import { Link, useMatch, useResolvedPath  } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from '../images/logo.png'

// export default function Navbar() {
//     return (
//         <nav class="nav navbar navbar-expand-lg" >
//             <div class="container container-fliud">
//                 <a class="navbar-brand" href="#">
//                     <img src={logo} alt="logo" id='logo'/>
//                 </a>
//                 <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                     <li class="nav-item">
//                         <Link to="/"  class="nav-link">
//                             Home 
//                         </Link>
//                     </li>
//                     <li class="nav-item">
//                         <CustomLink to="/products" class="nav-link">Products</CustomLink>
//                     </li>
//                     <li class="nav-item">
//                         <CustomLink to="/about" class="nav-link">About</CustomLink>
//                     </li>
//                     <li class="nav-item">
//                         <CustomLink to="/faqs" class="nav-link">FAQs</CustomLink>
//                     </li>
//                     <li class="nav-item">
//                         <CustomLink to="/contact" class="nav-link">Contact</CustomLink>
//                     </li>
//                     <li class="nav-item">
//                         <CustomLink to="/sell" class="nav-link">Sell</CustomLink>
//                     </li>
                    
                       
                   
//                 </ul>
//                 {/* <form class="d-flex" role="search" id='search'>
//                     <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
//                     <button class="btn btn-outline-success" type="submit">Search</button>
//                 </form> */}
                
//             </div>

//         </nav>
//     )
// }

// function CustomLink({ to, children, ...props }) {
    
//     const resolvedPath = useResolvedPath(to)
//     const isActive = useMatch({path: resolvedPath.pathname, end: true })
//     return (
//         <li className={ isActive ? "active" : "    "}>
//             <Link to={to} {...props}
//             style={isActive ? { borderBottom: '2px solid black' } : {}}
//             >{children}</Link>
//         </li>
//     )
// }

// import './Navbar.css';
// import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from '../images/logo.png';

// export default function Navbar() {
//     const navigate = useNavigate();
//     const isAuthenticated = !!localStorage.getItem('token'); // Check if user is logged in

//     const handleLogout = () => {
//         localStorage.removeItem('token'); // Remove the auth token
//         navigate('/auth'); // Redirect to login page
//     };

//     return (
//         <nav className="nav navbar navbar-expand-lg fixed-top">
//             <div className="container container-fluid">
//                 <a className="navbar-brand" href="/">
//                     <img src={logo} alt="logo" id="logo"/>
//                 </a>
//                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                     <li className="nav-item">
//                         <Link to="/" className="nav-link">Home</Link>
//                     </li>
//                     <li className="nav-item">
//                         <CustomLink to="/products" className="nav-link">Products</CustomLink>
//                     </li>
//                     <li className="nav-item">
//                         <CustomLink to="/about" className="nav-link">About</CustomLink>
//                     </li>
//                     <li className="nav-item">
//                         <CustomLink to="/faqs" className="nav-link">FAQs</CustomLink>
//                     </li>
//                     <li className="nav-item">
//                         <CustomLink to="/contact" className="nav-link">Contact</CustomLink>
//                     </li>
//                     <li className="nav-item">
//                         <CustomLink to="/sell" className="nav-link">Sell</CustomLink>
//                     </li>
//                 </ul>

//                 {/* Show Logout if user is logged in, otherwise show Login/Register */}
//                 <div className="d-flex">
//                     {isAuthenticated ? (
//                         <button onClick={handleLogout} className="btn btn-danger">Logout</button>
//                     ) : (
//                         <>
//                             <Link to="/login" className="btn btn-primary me-2">Login</Link>
//                             <Link to="/register" className="btn btn-success">Register</Link>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// }

// function CustomLink({ to, children, ...props }) {
//     const resolvedPath = useResolvedPath(to);
//     const isActive = useMatch({ path: resolvedPath.pathname, end: true });
//     return (
//         <li className={isActive ? "active" : ""}>
//             <Link to={to} {...props} style={isActive ? { borderBottom: '2px solid black' } : {}}>
//                 {children}
//             </Link>
//         </li>
//     );
// }

// import './Navbar.css';
// import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from '../images/logo.png';
// import { useState } from 'react';

// export default function Navbar() {
//     const navigate = useNavigate();
//     const isAuthenticated = !!localStorage.getItem('token'); // Check if user is logged in
//     const [dropdownOpen, setDropdownOpen] = useState(false);

//     const handleLogout = () => {
//         localStorage.removeItem('token'); // Remove auth token
//         navigate('/auth'); // Redirect to login page
//     };

//     return (
//         <nav className="nav navbar navbar-expand-lg fixed-top">
//             <div className="container container-fluid">
//                 <a className="navbar-brand" href="/">
//                     <img src={logo} alt="logo" id="logo" />
//                 </a>
//                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                     <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
//                     <li className="nav-item"><CustomLink to="/products" className="nav-link">Products</CustomLink></li>
//                     <li className="nav-item"><CustomLink to="/about" className="nav-link">About</CustomLink></li>
//                     <li className="nav-item"><CustomLink to="/faqs" className="nav-link">FAQs</CustomLink></li>
//                     <li className="nav-item"><CustomLink to="/contact" className="nav-link">Contact</CustomLink></li>
//                     <li className="nav-item"><CustomLink to="/sell" className="nav-link">Sell</CustomLink></li>
//                 </ul>

//                 {/* Profile Dropdown */}
//                 <div className="d-flex">
//                     {isAuthenticated ? (
//                         <div className="profile-container">
//                             <div 
//                                 className="profile-circle"
//                                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                             ></div>
//                             {dropdownOpen && (
//                                 <div className="dropdown-menu show">
//                                     <Link className="dropdown-item" to="/profile">Manage Profile</Link>
//                                     <button className="dropdown-item" onClick={handleLogout}>Logout</button>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <>
//                             <Link to="/login" className="btn btn-primary me-2">Login</Link>
//                             <Link to="/register" className="btn btn-success">Register</Link>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// }

// function CustomLink({ to, children, ...props }) {
//     const resolvedPath = useResolvedPath(to);
//     const isActive = useMatch({ path: resolvedPath.pathname, end: true });
//     return (
//         <li className={isActive ? "active" : ""}>
//             <Link to={to} {...props} style={isActive ? { borderBottom: '2px solid black' } : {}}>
//                 {children}
//             </Link>
//         </li>
//     );
// }

import './Navbar.css';
import { Link, useMatch, useResolvedPath, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';
import profilePic from '../images/profile.png';
import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem('token');

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false); // 🍔 toggle
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const hideAuthButtons = ["/auth", "/login", "/register"].includes(location.pathname);
    const userProfileImage = localStorage.getItem('profileImage') || profilePic;

    const fetchCartCount = async () => {
        if (!isAuthenticated) return;
        try {
            const response = await axios.get("http://localhost:8000/api/cart/count/", {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setCartCount(response.data.total_items);
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, [isAuthenticated]);

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, logout!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                localStorage.removeItem('profileImage');
                navigate('/');
                Swal.fire("Logged Out!", "You have been successfully logged out.", "success");
            }
        });
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (location.pathname.startsWith("/admin")) return null;

    return (
        <nav className="navbar navbar-expand-lg fixed-top nav">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="logo" id="logo" />
                </Link>

                {/* 🍔 Custom Hamburger Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setMenuOpen(prev => !prev)}
                >
                    <span className="navbar-toggler-icon">
                        {menuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 24 24">
                                <path d="M18 6L6 18M6 6l12 12" stroke="black" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        ) : (
                            <span className="navbar-toggler-icon" />
                        )}
                    </span>
                </button>

                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <CustomLink to="/" onClick={() => setMenuOpen(false)}>Home</CustomLink>

                        <li className="nav-item dropdown">
                            <span
                                className="nav-link dropdown-toggle"
                                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                                role="button"
                            >
                                Services
                            </span>
                            {servicesDropdownOpen && (
                                <ul className="dropdown-menu show">
                                    <li><Link className="dropdown-item" to="/buy" onClick={() => setMenuOpen(false)}>Buy</Link></li>
                                    <li><Link className="dropdown-item" to="/sell" onClick={() => setMenuOpen(false)}>Sell</Link></li>
                                    <li><Link className="dropdown-item" to="/demolish" onClick={() => setMenuOpen(false)}>Demolish</Link></li>
                                </ul>
                            )}
                        </li>

                        <CustomLink to="/about" onClick={() => setMenuOpen(false)}>About</CustomLink>
                        <CustomLink to="/faqs" onClick={() => setMenuOpen(false)}>FAQs</CustomLink>
                        <CustomLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</CustomLink>
                    </ul>

                    <div className="d-flex align-items-center">
                        {isAuthenticated && (
                            <Link to="/cart" className="cart-icon me-3" style={{ position: "relative" }} onClick={() => setMenuOpen(false)}>
                                <FaShoppingCart size={24} color="black" />
                                <p className="cart-badge" style={{
                                    position: "absolute",
                                    top: "-5px",
                                    right: "-5px",
                                    backgroundColor: cartCount > 0 ? "red" : "gray",
                                    color: "white",
                                    borderRadius: "50%",
                                    width: "18px",
                                    height: "18px",
                                    fontSize: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "bold",
                                }}>
                                    {cartCount}
                                </p>
                            </Link>
                        )}

                        {isAuthenticated ? (
                            <div className="profile-container" ref={dropdownRef}>
                                <div className="profile-circle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                    {userProfileImage !== profilePic ? (
                                        <img src={userProfileImage} alt="Profile" className="profile-img" />
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                                            className="bi bi-person-circle profile-icon" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                        </svg>
                                    )}
                                </div>
                                {dropdownOpen && (
                                    <div className="dropdown-menu show">
                                        <Link className="nav-dropdown-item" to="/profile" onClick={() => setMenuOpen(false)}>Manage Profile</Link>
                                        <Link className="nav-dropdown-item" to="/purchase" onClick={() => setMenuOpen(false)}>My Purchase</Link>
                                        <Link className="nav-dropdown-item" to="/" onClick={() => { setMenuOpen(false); handleLogout(); }}>Logout</Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            !hideAuthButtons && (
                                <div className="auth-buttons">
                                    <Link to="/login" className="btn btn-outline-primary me-2" onClick={() => setMenuOpen(false)}>Sign In</Link>
                                    <Link to="/auth" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

function CustomLink({ to, children, onClick, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <li className={`nav-item ${isActive ? "active" : ""}`}>
            <Link to={to} className="nav-link" onClick={onClick} {...props}>
                {children}
            </Link>
        </li>
    );
}




