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
import profilePic from '../images/profile.png'; // Default profile image
import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon
import axios from 'axios'; // Import axios for API calls

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); // Get current route

    const isAuthenticated = !!localStorage.getItem('token'); // Check if logged in
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0); // ✅ Store cart item count
    const dropdownRef = useRef(null);
    const servicesRef = useRef(null);

    // Hide Sign Up & Sign In buttons on /auth, /login, or /register
    const hideAuthButtons = ["/auth", "/login", "/register"].includes(location.pathname);

    // Fetch user profile image from localStorage
    const userProfileImage = localStorage.getItem('profileImage') || profilePic;

    // Fetch cart item count from backend
    const fetchCartCount = async () => {
        if (!isAuthenticated) return;
        try {
            const response = await axios.get("http://localhost:8000/api/cart/count/", {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setCartCount(response.data.total_items); // ✅ Update cart count
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    };

    // Fetch cart count on component mount
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
                Swal.fire({
                    title: "Logged Out!",
                    text: "You have been successfully logged out.",
                    icon: "success",
                    confirmButtonText: "OK"
                });
            }
        });
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (servicesRef.current && !servicesRef.current.contains(event.target)) {
                setServicesDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Hide Navbar on /admin pages
    if (location.pathname.startsWith("/admin")) {
        return null;
    }

    return (
        <nav className="nav navbar navbar-expand-lg fixed-top">
            <div className="container container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="logo" id="logo" />
                </a>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <CustomLink to="/">Home</CustomLink>
                    <li className="nav-item dropdown" ref={servicesRef}>
                        <span className="nav-link dropdown-toggle" onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}>
                            Services
                        </span>
                        {servicesDropdownOpen && (
                            <ul className="dropdown-menu show">
                                <li><Link className="nav-dropdown-item" to="/buy">Buy</Link></li>
                                <li><Link className="nav-dropdown-item" to="/sell">Sell</Link></li>
                                <li><Link className="nav-dropdown-item" to="/demolish">Demolish</Link></li>
                            </ul>
                        )}
                    </li>
                    <CustomLink to="/about">About</CustomLink>
                    <CustomLink to="/faqs">FAQs</CustomLink>
                    <CustomLink to="/contact">Contact</CustomLink>
                </ul>
                <div className="d-flex align-items-center">
                    {isAuthenticated && (
                        <Link to="/cart" className="cart-icon me-3" style={{ position: "relative" }}>
                            <FaShoppingCart size={24} color="black" />
                            {/* Always show the cart badge, even if it's 0 */}
                            <p className="cart-badge"
                                style={{
                                    position: "absolute",
                                    top: "-5px",
                                    right: "-5px",
                                    backgroundColor: cartCount > 0 ? "red" : "gray", // Change color if count is 0
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
                                    <img src={userProfileImage} alt="Profile" className="profile-img"/>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle profile-icon" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                    </svg>
                                )}
                            </div>
                            {dropdownOpen && (
                                <div className="dropdown-menu show">
                                    <Link className="nav-dropdown-item" to="/profile">Manage Profile</Link>
                                    <Link className="nav-dropdown-item" to="/purchase">My Purchase</Link>
                                    <Link className="nav-dropdown-item" to="/" onClick={handleLogout}>Logout</Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        !hideAuthButtons && (
                            <div className="auth-buttons">
                                <Link to="/login" className="btn btn-outline-primary me-2">Sign In</Link>
                                <Link to="/auth" className="btn btn-primary">Sign Up</Link>
                            </div>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <li className={`nav-item ${isActive ? "active" : ""}`}>
            <Link to={to} className="nav-link" {...props}>
                {children}
            </Link>
        </li>
    );
}




