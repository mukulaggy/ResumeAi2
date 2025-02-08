import React from "react";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import FeaturesSection from "../../components/FeatureSection";
import JobSeekersSection from "../../components/JobSeekersSection";
import RecruitersSection from "../../components/RecruiterSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturesSection />
      <JobSeekersSection />
      <RecruitersSection />
      <Footer />
    </div>
  );
};

export default Home;
