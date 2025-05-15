// src/features/landing/TestimonialsSection.jsx
import React from "react";
import "./landing.css";
import aliyaImg from "../../assets/aliya.jpg";
import nurgulImg from "../../assets/nurgul.jpg";
import ruslanImg from "../../assets/ruslan.jpg";
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Aliya M.",
      comment:
        "Thanks to BalaGuide, I found the perfect robotics course for my son. Super easy!",
      image: aliyaImg,
    },
    {
      name: "Ruslan K.",
      comment:
        "We tried three courses — all were excellent. Scheduling was so convenient!",
      image: ruslanImg,
    },
    {
      name: "Nurgul A.",
      comment:
        "BalaGuide really simplifies how I manage my child’s classes and teachers.",
      image: nurgulImg,
    },
  ];

  return (
    <section className="landing-testimonials" id="testimonials">
      <h2 className="landing-section-title">What Parents Say</h2>
      <div className="landing-testimonials-grid">
        {testimonials.map((item, index) => (
          <div key={index} className="landing-testimonial-card">
            <img src={item.image} alt={item.name} />
            <p>"{item.comment}"</p>
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
