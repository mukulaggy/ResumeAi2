import React, { useState } from 'react';

const Hero = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <nav className="px-6 py-4 relative z-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <a href="#" className="text-white text-2xl font-bold">
              ResumeAI
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-white cursor-pointer">
                Home
              </button>
              <button onClick={() => scrollToSection('features')} className="text-white cursor-pointer">
                Features
              </button>
              <button onClick={() => scrollToSection('students')} className="text-white cursor-pointer">
                Students
              </button>
              <button onClick={() => scrollToSection('recruiters')} className="text-white cursor-pointer">
                Recruiters
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMobileMenu} className="lg:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-800 py-4">
          <div className="container mx-auto px-6">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('home')} className="text-white text-left">
                Home
              </button>
              <button onClick={() => scrollToSection('features')} className="text-white text-left">
                Features
              </button>
              <button onClick={() => scrollToSection('students')} className="text-white text-left">
                Students
              </button>
              <button onClick={() => scrollToSection('recruiters')} className="text-white text-left">
                Recruiters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div id="home" className="container mx-auto px-6 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate__animated animate__fadeInLeft">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              AI-Powered Resume Analysis for Success
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Revolutionize your job search and recruitment process with our advanced AI analysis platform
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/get-started"
                className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300"
              >
                Click here to Get Started
              </a>
              <button
                onClick={() => scrollToSection('recruiters')}
                className="px-8 py-3 border-2 border-indigo-600 text-white rounded-full hover:bg-indigo-600/20 transition-colors duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="animate__animated animate__fadeInRight">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 rounded-2xl filter blur-3xl"></div>
              <div className="relative">
                <svg className="w-full h-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="50" y="50" width="300" height="200" rx="10" fill="#4F46E5" fillOpacity="0.1" stroke="#4F46E5" strokeWidth="2"/>
                  <rect x="70" y="80" width="260" height="20" rx="5" fill="#4F46E5" fillOpacity="0.2"/>
                  <rect x="70" y="110" width="200" height="20" rx="5" fill="#4F46E5" fillOpacity="0.2"/>
                  <rect x="70" y="140" width="230" height="20" rx="5" fill="#4F46E5" fillOpacity="0.2"/>
                  <rect x="70" y="170" width="180" height="20" rx="5" fill="#4F46E5" fillOpacity="0.2"/>
                  <circle cx="320" cy="160" r="40" fill="#4F46E5" fillOpacity="0.1" stroke="#4F46E5" strokeWidth="2"/>
                  <path d="M310 160L320 170L330 150" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;