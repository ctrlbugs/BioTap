'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/Navigation/Navbar';
import RouteScrollHandler from './components/RouteScrollHandler';
import Hero from './components/Hero/Hero';
import FeatureCards from './components/FeatureCards/FeatureCards';
import ExpandableCards from './components/ExpandableCards/ExpandableCards';
import AppScreens from './components/AppScreens/AppScreens';
import ConnectedProducts from './components/ConnectedProducts/ConnectedProducts';
import About from './components/About/About';
import Partners from './components/Partners/Partners';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer/Footer';
import SplashScreen from './components/SplashScreen/SplashScreen';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.has('fromUserAuth')) {
        params.delete('fromUserAuth');
        const cleanSearch = params.toString();
        const cleanUrl = cleanSearch ? `/?${cleanSearch}` : '/';
        window.history.replaceState(null, '', cleanUrl);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSplash]);

  return (
    <>
      <SplashScreen visible={showSplash} />
      <RouteScrollHandler />
      <Navbar />
      <Hero />
      <FeatureCards />
      <ExpandableCards />
      <About />
      <AppScreens />
      <ConnectedProducts />
      <ContactSection />
      <Partners />
      <Footer />
    </>
  );
}

