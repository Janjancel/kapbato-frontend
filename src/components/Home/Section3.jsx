// import React from "react";
// import { useNavigate } from "react-router-dom"; // 🚀 Import useNavigate
// import img1 from "../images/antique1.jpg";
// import img2 from "../images/antique2.jpg";
// import img3 from "../images/antique3.jpg";

// export default function Section3({ title, description }) {
//   const navigate = useNavigate(); // 🚀 Initialize navigation
//   const antiques = [
//     { id: 1, image: img1, name: "Vintage Clock", description: "A classic antique clock.", price: "120" },
//     { id: 2, image: img2, name: "Old Compass", description: "An antique brass compass.", price: "80" },
//     { id: 3, image: img3, name: "Porcelain Vase", description: "A delicate hand-painted vase.", price: "150" }
//   ];

//   return (
//     <section className="bg-light py-5 text-center" id="home-sec3">
//       <div className="container">
//         <div className="row align-items-center mb-4">
//           <div className="col-md-8 text-start">
//             <h1 className="fs-2 fw-bold text-capitalize">{title}</h1>
//             <p className="fs-6 text-secondary">{description}</p>
//             <button className="btn btn-dark mt-2" onClick={() => navigate("/buy")}>
//               Shop Now
//             </button>
//           </div>
//         </div>

//         <div className="row g-4">
//           {antiques.map((antique) => (
//             <div className="col-md-2" key={antique.id}>
//               <div className="card" style={{ border: "none", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: "12px", padding: "10px", textAlign: "left" }}>
//                 <img
//                   src={antique.image}
//                   alt={antique.name}
//                   className="card-img-top"
//                   style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
//                   onError={(e) => (e.target.src = "placeholder.jpg")}
//                 />
//                 <div className="card-body">
//                   <h5 style={{ fontSize: "1rem", fontWeight: "bold" }}>{antique.name}</h5>
//                   <p style={{ fontSize: "0.9rem", color: "#555" }}>{antique.description}</p>
//                   <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#333" }}>${antique.price}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";
import img1 from "../images/antique1.jpg";
import img2 from "../images/antique2.jpg";
import img3 from "../images/antique3.jpg";

export default function Section3({ title, description }) {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [animationClass, setAnimationClass] = useState("");
  const [scrollDirection, setScrollDirection] = useState("down");
  const lastScrollY = useRef(0);

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
          // Trigger fade-in animation when section is 30% visible
          setAnimationClass("animate__animated animate__fadeIn");
        } else {
          // Trigger fade-out when less than 30% is visible
          setAnimationClass("animate__animated animate__fadeOut");
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

  const antiques = [
    { id: 1, image: img1, name: "Vintage Clock", description: "A classic antique clock.", price: "120" },
    { id: 2, image: img2, name: "Old Compass", description: "An antique brass compass.", price: "80" },
    { id: 3, image: img3, name: "Porcelain Vase", description: "A delicate hand-painted vase.", price: "150" }
  ];

  return (
    <section className="bg-light py-5 text-center" id="home-sec3" ref={sectionRef}>
      <div className={`container ${animationClass}`}>
        <div className="row align-items-center mb-4">
          <div className="col-md-8 text-start">
            <h1 className="fs-2 fw-bold text-capitalize">{title}</h1>
            <p className="fs-6 text-secondary">{description}</p>
            <button className="btn btn-dark mt-2" onClick={() => navigate("/buy")}>
              Shop Now
            </button>
          </div>
        </div>

        <div className="row g-4">
          {antiques.map((antique) => (
            <div className="col-md-2" key={antique.id}>
              <div
                className="card"
                style={{
                  border: "none",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  padding: "10px",
                  textAlign: "left"
                }}
              >
                <img
                  src={antique.image}
                  alt={antique.name}
                  className="card-img-top"
                  style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                  onError={(e) => (e.target.src = "placeholder.jpg")}
                />
                <div className="card-body">
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold" }}>{antique.name}</h5>
                  <p style={{ fontSize: "0.9rem", color: "#555" }}>{antique.description}</p>
                  <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#333" }}>${antique.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
