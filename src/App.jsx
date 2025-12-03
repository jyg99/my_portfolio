import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TechStackSection from './components/TechStackSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SideNavigation from './components/SideNavigation';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div className="snap-container">
      <CustomCursor />
      <SideNavigation />
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
} 

export default App;
