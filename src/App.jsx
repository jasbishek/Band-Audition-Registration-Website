import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import VisualizerBackground from './components/VisualizerBackground';
import CollegeHeader from './components/CollegeHeader';
import BandBranding from './components/BandBranding';
import Hero from './components/Hero';
import AuditionCategory from './components/AuditionCategory';
import RegistrationForm from './components/RegistrationForm';
import SuccessModal from './components/SuccessModal';
import PhotoSlideshow from './components/PhotoSlideshow';
import VenueContact from './components/VenueContact';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

import { apiFetch } from './admin/api';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState(window.location.pathname);
  const [submittedStudent, setSubmittedStudent] = useState(null);

  // Admin Auth State
  const [adminToken, setAdminToken] = useState(() => {
    return sessionStorage.getItem('band_unknown_admin_token') || null;
  });

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Verify server token on mount / route change if admin token exists
  useEffect(() => {
    if (adminToken && route.startsWith('/admin')) {
      apiFetch('/api/admin/verify', {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      })
        .then(({ ok }) => {
          if (!ok) throw new Error('Invalid token');
        })
        .catch(() => {
          sessionStorage.removeItem('band_unknown_admin_token');
          setAdminToken(null);
        });
    }
  }, [route, adminToken]);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (category) => {
    if (category === 'Singing') {
      navigateTo('/register/singing');
    } else {
      navigateTo('/register/instruments');
    }
  };

  const handleHeroRegisterClick = () => {
    const el = document.getElementById('audition-selection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo('/#audition-selection');
    }
  };

  const handleLoginSuccess = (token) => {
    setAdminToken(token);
    navigateTo('/admin/dashboard');
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('band_unknown_admin_token');
    setAdminToken(null);
    navigateTo('/admin');
  };

  // Route Handler for Hidden Admin Portal
  if (route === '/admin' || route === '/admin/' || route === '/admin-login') {
    if (adminToken) {
      return <AdminDashboard token={adminToken} onLogout={handleAdminLogout} />;
    }
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  if (route.startsWith('/admin/dashboard')) {
    if (!adminToken) {
      window.history.replaceState({}, '', '/admin');
      return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
    }
    return <AdminDashboard token={adminToken} onLogout={handleAdminLogout} />;
  }

  // DEDICATED SINGING REGISTRATION PAGE
  if (route === '/register/singing') {
    return (
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        <VisualizerBackground />
        <header className="branding-stack">
          <CollegeHeader />
          <BandBranding />
        </header>
        <RegistrationForm 
          category="Singing" 
          onSuccess={(student) => setSubmittedStudent(student)}
          onBackToHome={() => navigateTo('/')}
        />
        <Footer />

        {submittedStudent && (
          <SuccessModal 
            student={submittedStudent} 
            onClose={() => {
              setSubmittedStudent(null);
              navigateTo('/');
            }} 
          />
        )}
      </div>
    );
  }

  // DEDICATED INSTRUMENT REGISTRATION PAGE
  if (route === '/register/instruments') {
    return (
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        <VisualizerBackground />
        <header className="branding-stack">
          <CollegeHeader />
          <BandBranding />
        </header>
        <RegistrationForm 
          category="Instruments" 
          onSuccess={(student) => setSubmittedStudent(student)}
          onBackToHome={() => navigateTo('/')}
        />
        <Footer />

        {submittedStudent && (
          <SuccessModal 
            student={submittedStudent} 
            onClose={() => {
              setSubmittedStudent(null);
              navigateTo('/');
            }} 
          />
        )}
      </div>
    );
  }

  // PUBLIC HOME PAGE (No Registration Form on Home Page!)
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Loading Screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Background Spider Web + Equalizer Canvas */}
      <VisualizerBackground />

      {/* 1, 2 & 3. Unified Top Branding Stack with Equal Vertical Spacing */}
      <header className="branding-stack">
        <CollegeHeader />
        <BandBranding />
      </header>

      {/* 4. Main Hero Section */}
      <Hero onRegisterClick={handleHeroRegisterClick} />

      {/* 5. Audition Category Selection (Leads to Dedicated Pages) */}
      <AuditionCategory 
        selectedCategory={null} 
        onSelectCategory={handleSelectCategory} 
      />

      {/* 6. Automatic Photo Slideshow */}
      <PhotoSlideshow />

      {/* 7. Audition Venue & Contact Details */}
      <VenueContact />

      {/* 8. Final Call to Action */}
      <FinalCTA onJoinClick={handleHeroRegisterClick} />

      {/* 9. Footer */}
      <Footer />
    </div>
  );
}
