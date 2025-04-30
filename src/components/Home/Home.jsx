// import './Home.css'
// import funFactImage from '../images/fun-fact.webp'
// import img1 from '../images/antique1.jpg'
// import img2 from '../images/antique2.jpg'
// import img3 from '../images/antique3.jpg'
// import React, { useState } from 'react';
// import MapComponent from "../MapComponent";

// export default function Home() {
//     const [showDiv, setShowDiv] = useState(false);

//     return (
//         <div id='homepage'>
//             <section id='home-sec1'>
//                 <div class="home-sec1-container">
//                     <div className="upper">
//                         <h1 class="welcome">welcome to unika antika</h1>
//                         <h6 class="explore">explore our unique collection of antique items.</h6>
//                     </div>
//                     <div className="lower">
//                         <button id='register'>Register</button>
//                         <button id='login'>Login</button>
//                     </div>
//                 </div>
//             </section>

//             <section id="home-sec2">
//                 <div className="home-sec2-container">
//                     <div className="left col order-1">
//                         <h1>discover the unique</h1>
//                         <h6>explore our collection of exquisite antiques</h6>
//                         <form action="">
//                             <input id='search-input' type="text" placeholder='Search for your favorite antique'/>
//                         </form>
//                         <button id='view-all-btn'>view all</button>
//                     </div>
//                     <div className="right col order-1"></div>
//                 </div>
//             </section>

//             <section id="home-sec3">
//                 <div className="home-sec3-container">
//                     <div className="sec3-upper">
//                         <div className="left-container"></div>
//                         <div className="right-container">
//                             <h1>featured products</h1>
//                             <p>Discover our handpick collection</p>
//                             <button id='shop-now'>Shop Now</button>
//                         </div>
//                     </div>

//                     <div className="sec3-lower">
//                         <div class="container text-center">
//                             <div class="row">
//                                 <div class="col order-1">
//                                     <div class="card">
//                                         <img src={img1} class="card-img-top img-fluid" alt="..."/>
//                                         <div class="card-body">
//                                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                                             <h5 class="card-title">$price</h5>
//                                             {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
//                                         </div>
//                                     </div>
//                                 </div>



//                                 <div class="col order-5">
//                                     <div class="card">
//                                         <img src={img2} class="card-img-top img-fluid" alt="..."/>
//                                         <div class="card-body">
//                                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                                             <h5 class="card-title">$price</h5>
//                                             {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="col order-1">
                                    
//                                     <div class="card">
//                                         <img src={img3} class="card-img-top img-fluid" alt="..."/>
//                                         <div class="card-body">
//                                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                                             <h5 class="card-title">$price</h5>
//                                             {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <section id="home-sec4">
//                 <div className="home-sec4-container">

//                     <div className="sec4-upper">

//                         <div className="sec4-left-container">
//                             <h1>educational facts</h1>
//                             <p>Read about the history of antique treasures </p>
//                             <button id="explore-btn" onClick={() => setShowDiv(!showDiv)}>
//                                 {/* when the button is in useState, the Hide content text will appear. */}
//                                 {showDiv ? "Hide Content" : "Explore More"}
//                             </button>
//                         </div>
//                         <div className="sec4-right-container">
//                             <img src={funFactImage} alt="" class="img-fluid"   />
//                         </div>
//                     </div>

//                     <div className="sec4-lower row">
//                         <div class="sec4-card mb-3 order-1" >
//                             <div class="row g-0">
//                                 <div class="col-md-4">
//                                 <img src={img1} class="img-fluid rounded-start" alt="..."/>
//                                 </div>
//                                 <div class="col-md-8">
//                                 <div class="sec4-card-body">
//                                     <h5 class="sec4-card-title">The Art of Restoration</h5>
//                                     <p class="sec4-card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//                                     <p class="sec4-card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
//                                 </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div class="sec4-card mb-3 order-1" >
//                             <div class="row g-0">
//                                 <div class="col-md-4">
//                                 <img src={img1} class="img-fluid rounded-start" alt="..."/>
//                                 </div>
//                                 <div class="col-md-8">
//                                 <div class="sec4-card-body">
//                                     <h5 class="sec4-card-title">Uncovering Hidden Gems</h5>
//                                     <p class="sec4-card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//                                     <p class="sec4-card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
//                                 </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {showDiv && (
//                         <section id='educ-facts-section'>
//                             <h1>Locations of Heritage Houses in Region IV-A</h1>
//                             <div id="map-container">
//                                 <MapComponent />
//                             </div>
//                         </section>
//                     )}

//                 </div>
//             </section>
//         </div>

//     )
    
// }


import { useNavigate } from 'react-router-dom';
import React from 'react';
import './Home.css';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';

export default function Home() {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div id='homepage'>
      <Section1 
        title="Welcome to Unika Antika" 
        subtitle="Explore our unique collection of antique items." 
        onRegisterClick={() => navigate('/register')} // Navigate to register page
        onLoginClick={() => navigate('/login')}
      />
      
      <Section2 
        title="Discover the Unique" 
        subtitle="Explore our collection of exquisite antiques" 
        onSearchSubmit={(e) => { e.preventDefault(); console.log('Searching...') }}
        onViewAllClick={() => console.log('View All clicked')}
      />
      
      <Section3 
        title="Featured Products" 
        description="Discover our handpicked collection" 
        onShopNowClick={() => console.log('Shop Now clicked')}
      />
      
      <Section4 
        title="Educational Facts" 
        description="Read about the history of antique treasures"
      />
    </div>
  );
}
