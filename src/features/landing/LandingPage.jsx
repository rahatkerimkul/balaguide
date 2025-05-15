// src/features/landing/LandingPage.jsx
import React from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import CoursesSection from "./CoursesSection";
import InstructorsSection from "./InstructorsSection";
import TestimonialsSection from "./TestimonialsSection";
import "./landing.css";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <CoursesSection />
      <InstructorsSection />
      <TestimonialsSection />
    </div>
  );
};

export default LandingPage;
