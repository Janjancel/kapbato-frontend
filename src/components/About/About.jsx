import React from 'react';
import '../../App.css'
import historyImage from '../images/history.jpg';
import establishmentLogo from '../images/establishmentLogo.png';
import expansionLogo from '../images/expansionLogo.png';
import missionLogo from '../images/missionLogo.png';


export default function About() {
    return (
        <div className="about-page animate__animated animate__lightSpeedInLeft">
            {/* Hero Section */}
            <section className="bg-dark text-white text-center py-4">
                <h1 className="fw-bold">Unika Antika</h1>
                <p className="text">Discover the history and treasures of Unika Antika.</p>
            </section>

            {/* Our Story Section */}
            <section className="py-4 bg-light text-center">
                <div className="container">
                    <div className="row align-items-center text-start">
                        {/* <div className="col-md-5">
                            <img src={historyImage} className="w-50 mx-auto d-block rounded" alt="History" />
                        </div> */}
                        <div className="col-md-7">
                            <h2 className="fw-bold">Our Story</h2>
                            <p className="text-muted">Preserving antiques, one artifact at a time.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Minimal Cards Section */}
            <section className="py-4">
                <div className="container">
                    <div className="row g-3">
                        {[
                            { img: establishmentLogo, title: "Establishment", text: "Founded with a vision to preserve antique treasures." },
                            { img: expansionLogo, title: "Expansion", text: "Growing our collection and reach globally." },
                            { img: missionLogo, title: "Mission", text: "Dedicated to history, culture, and preservation." }
                        ].map((card, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card h-100 text-center border-0 shadow-sm d-flex flex-column align-items-center justify-content-center p-3">
                                    <img src={card.img} className="w-25 my-2" alt={card.title} />
                                    <h5 className="fw-bold">{card.title}</h5>
                                    <p className="text-muted small">{card.text}</p> {/* <-- Added Description */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
