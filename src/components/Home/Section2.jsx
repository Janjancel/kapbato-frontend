// import React from "react";
// import "./Home.css";
// import antiqueCollectionImage from '../images/antique-collection.avif';

// export default function Section2({ title, subtitle, onSearchSubmit, onViewAllClick }) {
//   return (
//     <section className="bg-light py-5 px-3 w-100" id="home-sec2">
//       <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center text-start animate__animated animate__slideInLeft">
//         <div className="w-100 w-md-50 p-4 me-md-4">
//           <h1 className="fs-2 fw-bold text-capitalize mb-2">{title}</h1>
//           <h6 className="fs-6 text-secondary text-capitalize mb-3">{subtitle}</h6>
//           <form onSubmit={onSearchSubmit} className="mb-3">
//             <input 
//               type="text" 
//               placeholder='Search for your favorite antique' 
//               className="form-control w-75"
//             />
//           </form>
//           <button 
//             className="btn btn-dark w-50"
//             onClick={onViewAllClick}
//           >
//             View All
//           </button>
//         </div>
//         <div className="d-flex justify-content-center">
//           <img 
//             src={antiqueCollectionImage} 
//             alt="Antique Collection" 
//             className="w-75 rounded shadow-lg"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import "animate.css";
import antiqueCollectionImage from "../images/antique-collection.avif";

export default function Section2({ title, subtitle, onSearchSubmit, onViewAllClick }) {
  const sectionRef = useRef(null);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger fade-in when the section is 30% visible
          setAnimationClass("animate__animated animate__fadeIn");
        } else {
          // Trigger fade-out when the section is less than 30% visible
          setAnimationClass("animate__animated animate__fadeOut");
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="bg-light py-5 px-3 w-100" id="home-sec2" ref={sectionRef}>
      <div className={`container d-flex flex-column flex-md-row justify-content-center align-items-center text-start ${animationClass}`}>
        <div className="w-100 w-md-50 p-4 me-md-4">
          <h1 className="fs-2 fw-bold text-capitalize mb-2">{title}</h1>
          <h6 className="fs-6 text-secondary text-capitalize mb-3">{subtitle}</h6>
          <form onSubmit={onSearchSubmit} className="mb-3">
            <input
              type="text"
              placeholder="Search for your favorite antique"
              className="form-control w-75"
            />
          </form>
          <button className="btn btn-dark w-50" onClick={onViewAllClick}>
            View All
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <img
            src={antiqueCollectionImage}
            alt="Antique Collection"
            className="w-75 rounded shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
