'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/app/contexts/LanguageContext';

const FLIP_ITEMS = [
  { captionKey: 'hero.flip.caption1', mainKey: 'hero.flip.main1', highlightWord: 'biometric' },
  { captionKey: 'hero.flip.caption2', mainKey: 'hero.flip.main2', highlightWord: 'frictionless' },
  { captionKey: 'hero.flip.caption3', mainKey: 'hero.flip.main3', highlightWord: 'gesture' },
];

const HERO_IMAGES = [
  { src: '/images/Merchant.png', alt: 'BioTap merchant' },
  { src: '/images/holdphone.png', alt: 'BioTap app mockup' },
];

function renderMainWithHighlight(text: string, highlightWord: string) {
  if (!highlightWord || !text.includes(highlightWord)) {
    return text;
  }
  const parts = text.split(highlightWord);
  return (
    <>
      {parts[0]}
      <span className="hero-flip-highlight">{highlightWord}</span>
      {parts.slice(1).join(highlightWord)}
    </>
  );
}

function renderMobileHeroMainText(mainKey: string) {
  if (mainKey !== 'hero.flip.main3') return null;

  return (
    <>
      One Secure Tap <span className="hero-flip-highlight-black">Instant</span> Access{'\n'}Anywhere
    </>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const heroSectionRef = useRef<HTMLElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [flipIndex, setFlipIndex] = useState(0);
  const [hasCompletedCycle, setHasCompletedCycle] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [hasCompletedImageCycle, setHasCompletedImageCycle] = useState(false);
  const wasInViewRef = useRef(true);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 768);
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  // Reset flip when user leaves section and comes back
  useEffect(() => {
    const el = heroSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const nowInView = entry.isIntersecting;
          if (nowInView && !wasInViewRef.current) {
            setFlipIndex(0);
            setHasCompletedCycle(false);
            setImageIndex(0);
            setHasCompletedImageCycle(false);
          }
          wasInViewRef.current = nowInView;
          setIsInView(nowInView);
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Flip through items - stop after last one
  useEffect(() => {
    if (hasCompletedCycle || !isInView) return;
    const timer = setTimeout(() => {
      if (flipIndex >= FLIP_ITEMS.length - 1) {
        setHasCompletedCycle(true);
      } else {
        setFlipIndex((prev) => prev + 1);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [flipIndex, hasCompletedCycle, isInView]);

  // Switch hero image: Merchant -> holdphone -> back to Merchant (then stop)
  useEffect(() => {
    if (!isInView || hasCompletedImageCycle) return;
    const timer = setTimeout(() => {
      setImageIndex((prev) => {
        if (prev === 0) return 1;
        setHasCompletedImageCycle(true);
        return 0;
      });
    }, 10000);
    return () => clearTimeout(timer);
  }, [imageIndex, isInView, hasCompletedImageCycle]);

  // Show scroll line only while user is actively scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToExplore = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getHeroMainText = (mainKey: string) => {
    if (isMobile && mainKey === 'hero.flip.main3') {
      return 'One Secure Tap. Instant Authentication.';
    }
    return t(mainKey);
  };

  return (
    <section ref={heroSectionRef} className="hero hero-redesign" id="hero">
      <div className="hero-container hero-container-redesign">
        {/* Left - Flip text */}
        <div className="hero-content hero-content-left fade-in">
          <div className="hero-flip-container">
            <p className="hero-flip-caption">
              {FLIP_ITEMS.map((item, idx) => (
                <span
                  key={item.captionKey}
                  className={`hero-flip-caption-text ${idx === flipIndex ? 'active' : ''}`}
                >
                  {t(item.captionKey)}
                </span>
              ))}
            </p>
            <h1 className="hero-title hero-title-redesign hero-title-flip">
              {FLIP_ITEMS.map((item, idx) => (
                <span
                  key={item.mainKey}
                  className={`hero-flip-title ${idx === flipIndex ? 'active' : ''}`}
                >
                  {isMobile && item.mainKey === 'hero.flip.main3'
                    ? renderMobileHeroMainText(item.mainKey)
                    : renderMainWithHighlight(getHeroMainText(item.mainKey), item.highlightWord)}
                </span>
              ))}
            </h1>
          </div>
          <div className={`hero-scroll-explore ${isScrolling ? 'scrolling' : ''}`} onClick={scrollToExplore} onKeyDown={(e) => e.key === 'Enter' && scrollToExplore()} role="button" tabIndex={0}>
            <div className="hero-scroll-track" aria-hidden>
              <span className="hero-scroll-line-active" />
              <span className="hero-scroll-line-inactive" />
              <span className="hero-scroll-line-inactive" />
            </div>
            <span className="hero-scroll-text">{t('hero.scrollExplore')}</span>
          </div>
        </div>

        {/* Center - Mockup image */}
        <div className="hero-visual hero-visual-center fade-in">
          <div className="hero-image-container hero-image-stack hero-mockup-stack">
            {HERO_IMAGES.map((img, idx) => (
              <Image
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={560}
                height={840}
                quality={100}
                unoptimized
                className={`hero-image hero-mockup-img hero-image-slide ${img.src.includes('holdphone') ? 'hero-mockup-img--holdphone' : ''} ${img.src.includes('Merchant') ? 'hero-mockup-img--merchant' : ''} ${idx === imageIndex ? 'active' : ''}`}
                priority={idx === 0}
              />
            ))}
          </div>
        </div>

        {/* Right - Stats and download */}
        <div className="hero-content hero-content-right fade-in">
          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <span className="hero-stat-label">{t('hero.activeUsersLabel')}</span>
              <span className="hero-stat-number">{t('hero.activeUsersNumber')}</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-label">{t('hero.downloadLabel')}</span>
              <span className="hero-stat-number">{t('hero.downloadNumber')}</span>
            </div>
          </div>
          <p className="hero-placeholder-text">{t('hero.downloadPlaceholder')}</p>
          <p className="hero-download-label">{t('hero.downloadNowOn')}</p>
          <div className="hero-store-buttons">
            <a href="#" className="hero-store-btn" aria-label="Download on App Store">
              <Image src="/images/Appstore.png" alt="App Store" width={160} height={48} unoptimized />
            </a>
            <a href="#" className="hero-store-btn" aria-label="Get it on Google Play">
              <Image src="/images/Googleplay.png" alt="Google Play" width={160} height={48} unoptimized />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
