// import React, { useState } from "react";
// import img4 from "../images/clock.jpeg";
// import img5 from "../images/horn.webp";
// import MapComponent from "../MapComponent";

// export default function Section4({ title, description }) {
//   const [showDiv, setShowDiv] = useState(false);

//   return (
//     <section className="bg-light py-5 text-center  animate__animated animate__fadeInDown">
//       <div className="container">
        
//         {/* Title & Description */}
//         <div className="row align-items-center mb-4">
//           <div className="col-md-8 text-start">
//             <h1 className="fs-2 fw-bold text-capitalize">{title}</h1>
//             <p className="fs-6 text-secondary">{description}</p>
//             <button 
//               className="btn btn-dark mt-3" 
//               onClick={() => setShowDiv(!showDiv)}
//             >
//               {showDiv ? "Hide Map" : "Explore More"}
//             </button>
//           </div>
//         </div>

//         {/* Minimal Info Cards with Full-Width Image */}
//         <div className="row g-4">
//           <div className="col-md-6">
//             <div className="bg-white rounded shadow-sm overflow-hidden">
//               <div className="card-img-top" style={{ height: "200px", overflow: "hidden" }}>
//                 <img src={img4} className="w-100 h-100" style={{ objectFit: "cover" }} alt="Educational Fact 1" />
//               </div>
//               <div className="p-3">
//                 <p className="text-muted small">Explore the rich history of ancient artifacts and their significance.</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="bg-white rounded shadow-sm overflow-hidden">
//               <div className="card-img-top" style={{ height: "200px", overflow: "hidden" }}>
//                 <img src={img5} className="w-100 h-100" style={{ objectFit: "cover" }} alt="Educational Fact 2" />
//               </div>
//               <div className="p-3">
//                 <p className="text-muted small">Learn about the craftsmanship and techniques used in antique creations.</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Expandable Map Section */}
//         <div 
//           className={`mt-4 overflow-hidden transition-height`} 
//           style={{ 
//             maxHeight: showDiv ? "500px" : "0px", 
//             height: showDiv ? "500px" : "0px",  
//             transition: "max-height 0.5s ease-in-out, height 0.5s ease-in-out"
//           }}
//         >
//           <h2 className="fs-4 text-center mt-3">Locations of Heritage Houses in Region IV-A</h2>
//           <div className="w-100" style={{ height: "400px", minHeight: "400px" }}>
//             <MapComponent />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import "animate.css";
import img4 from "../images/clock.jpeg";
import img5 from "../images/horn.webp";
import MapComponent from "../MapComponent";

export default function Section4({ title, description }) {
  const [showDiv, setShowDiv] = useState(false);
  const [inView, setInView] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const sectionRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Only set inView true when the section is 30% visible
          setInView(true);
        } else {
          // Set inView false when the section is less than 30% visible
          setInView(false);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      className={`bg-light py-5 text-center animate__animated ${
        inView
          ? scrollDirection === "down"
            ? "animate__fadeIn animate__slower"
            : "animate__fadeOut animate__slower"
          : ""
      }`}
      ref={sectionRef}
    >
      <div className="container">
        {/* Title & Description */}
        <div className="row align-items-center mb-4">
          <div className="col-md-8 text-start">
            <h1 className="fs-2 fw-bold text-capitalize">{title}</h1>
            <p className="fs-6 text-secondary">{description}</p>
            <button
              className="btn btn-dark mt-3"
              onClick={() => setShowDiv(!showDiv)}
            >
              {showDiv ? "Hide Map" : "Explore More"}
            </button>
          </div>
        </div>

        {/* Minimal Info Cards */}
        <div className="row g-4">
          <div className="col-md-6">
            <div className="bg-white rounded shadow-sm overflow-hidden">
              <div className="card-img-top" style={{ height: "200px", overflow: "hidden" }}>
                <img
                  src={img4}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt="Educational Fact 1"
                />
              </div>
              <div className="p-3">
                <p className="text-muted small">
                  Explore the rich history of ancient artifacts and their
                  significance.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="bg-white rounded shadow-sm overflow-hidden">
              <div className="card-img-top" style={{ height: "200px", overflow: "hidden" }}>
                <img
                  src={img5}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt="Educational Fact 2"
                />
              </div>
              <div className="p-3">
                <p className="text-muted small">
                  Learn about the craftsmanship and techniques used in antique
                  creations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Map Section */}
        <div
          className={`mt-4 overflow-hidden transition-height`}
          style={{
            maxHeight: showDiv ? "500px" : "0px",
            height: showDiv ? "500px" : "0px",
            transition: "max-height 0.5s ease-in-out, height 0.5s ease-in-out",
          }}
        >
          <h2 className="fs-4 text-center mt-3">
            Locations of Heritage Houses in Region IV-A
          </h2>
          <div className="w-100" style={{ height: "400px", minHeight: "400px" }}>
            <MapComponent />
          </div>
        </div>
      </div>
    </section>
  );
}
