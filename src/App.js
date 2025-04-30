import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import Auth from "./components/Home/Auth";
import Admin from "./components/AdminDashboard/Admin/Admin";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile/Profile";
import Demolish from "./components/Demolish/Demolish";
import Sell from "./components/Sell/Sell";
import Buy from "./components/Buy";
import Cart from "./components/Cart";
import "./App.css"; // Ensure styles are included
import 'animate.css';

function App() {
  const location = useLocation(); // Get the current route
  const isSuperuser = localStorage.getItem("isSuperuser") === "true"; // Convert to boolean

  useEffect(() => {
    // Check if user is in the admin page
    if (location.pathname.startsWith("/admin")) {
      document.body.style.paddingTop = "0";
    } else {
      document.body.style.paddingTop = "10vh";
    }
  }, [location.pathname]); // Runs when route changes

  return (
    <>
      {/* Show Navbar only if not on admin pages */}
      {!location.pathname.startsWith("/admin") && <Navbar />}

      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} /> {/* ✅ Add this line */}
            <Route path="/demolish" element={<Demolish />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/buy" element={<Buy />} />
          </Route>

          {/* Admin Route - Only Superusers Allowed */}
          <Route
            path="/admin/*"
            element={isSuperuser ? <Admin /> : <Navigate to="/" replace />}
          />

            {/* Catch-all route to redirect unknown paths to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Show Footer only if not on admin pages */}
      {!location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}

export default App;



  // let Component
  // switch (window.location.pathname) {
  //   case "/":
  //     Component = <Home />
  //     break
  //   case "/about":
  //     Component = <About/>
  //     break
  //   case "/contact":
  //     Component = <Contact/>
  //     break 
  // }



// import './App.css';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//     const [items, setItems] = useState([]);

//     useEffect(() => {
//         axios.get('http://127.0.0.1:8000/api/items/')
//             .then(response => {
//                 setItems(response.data);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the data!', error);
//             });
//     }, []);

//     return (
//         <div>
//             <h1>Items</h1>
//             <ul>
//                 {items.map(item => (
//                     <li key={item.id}>
//                         {item.name} - ${item.price}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default App;