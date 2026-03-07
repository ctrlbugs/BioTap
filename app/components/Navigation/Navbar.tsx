'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useContactModal } from '@/app/components/ContactModal/ContactModal';

// Bump this version when you change logo.png to bypass cache
const LOGO_VERSION = 3;

const PRODUCT_MENU_GROUPS = [
  {
    title: 'Payments',
    accentClass: 'is-payments',
    items: [
      { label: 'Instant Payments', description: 'Fast confirmed biometric payments.', sectionId: 'expandable-cards' },
      { label: 'Remote Payments', description: 'Receive payments anytime, anywhere.', sectionId: 'expandable-cards' },
      { label: 'Tap to Pay', description: 'Secure tap checkout for merchants.', sectionId: 'expandable-cards' },
      { label: 'Cardless Payments', description: 'No cards or cash required.', sectionId: 'expandable-cards' },
    ],
  },
  {
    title: 'Connected Products',
    accentClass: 'is-products',
    items: [
      { label: 'Point of Sale', description: 'Accept payments with BioTap POS.', sectionId: 'connected-products' },
      { label: 'Offline Payment', description: 'Keep selling even without internet.', sectionId: 'connected-products' },
      { label: 'Inventory Management', description: 'Track stock and daily sales.', sectionId: 'connected-products' },
      { label: 'Contact Sales', description: 'Talk to our team about deployment.', sectionId: 'contact' },
    ],
  },
  {
    title: 'Identity & Access',
    accentClass: 'is-identity',
    items: [
      { label: 'Biometric Login', description: 'One-touch authentication and access.', sectionId: 'app-screens' },
      { label: 'Merchant Network', description: 'Connect users, merchants, and banks.', sectionId: 'about' },
      { label: 'Security & Privacy', description: 'Built around trust and compliance.', sectionId: 'about' },
      { label: 'About BioTap', description: 'Learn more about our mission.', sectionId: 'about' },
    ],
  },
] as const;

export default function Navbar() {
  const { t } = useLanguage();
  const { openModal: openContactModal } = useContactModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const productDropdownRef = useRef<HTMLLIElement>(null);
  const companyDropdownRef = useRef<HTMLLIElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      // On mobile viewports, let the toggle buttons control open/close
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        return;
      }

      if (target) {
        // Ignore clicks inside the desktop product dropdown wrapper
        if (productDropdownRef.current && productDropdownRef.current.contains(target)) {
          return;
        }

        // Ignore clicks inside the desktop company dropdown wrapper
        if (companyDropdownRef.current && companyDropdownRef.current.contains(target)) {
          return;
        }

        // Ignore clicks inside any mobile dropdown container
        if (target.closest('.mobile-nav-dropdown')) {
          return;
        }
      }

      setProductDropdownOpen(false);
      setCompanyDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId: string) => {
    e.preventDefault();
    if (sectionId === 'contact') {
      openContactModal();
    } else {
      scrollToSection(sectionId);
    }
    window.history.pushState(null, '', href);
    setMobileMenuOpen(false);
    setProductDropdownOpen(false);
    setCompanyDropdownOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleProductMenuClick = (sectionId: string) => {
    if (sectionId === 'contact') {
      openContactModal();
    } else {
      scrollToSection(sectionId);
    }
    window.history.pushState(null, '', '/');
    setProductDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleCompanyMenuClick = (sectionId: string) => {
    if (sectionId === 'contact') {
      openContactModal();
    } else {
      scrollToSection(sectionId);
    }
    window.history.pushState(null, '', '/');
    setCompanyDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: t('nav.solution'), sectionId: 'expandable-cards' },
    { href: '/contact', label: t('nav.contact'), sectionId: 'contact' },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolling ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link href="/" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); window.history.pushState(null, '', '/'); }}>
            <Image
              src={`/images/logo.png?v=${LOGO_VERSION}`}
              alt="BioTap"
              width={36}
              height={36}
              priority
              unoptimized
            />
            <span className="logo-text">BioTap</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            <li className="nav-dropdown-wrapper" ref={productDropdownRef}>
              <button
                type="button"
                className="nav-dropdown-trigger"
                onClick={() => {
                  const next = !productDropdownOpen;
                  setProductDropdownOpen(next);
                  if (next) setCompanyDropdownOpen(false);
                }}
                aria-expanded={productDropdownOpen}
                aria-haspopup="true"
              >
                {t('nav.product')}
                <span className={`nav-dropdown-arrow ${productDropdownOpen ? 'open' : ''}`} aria-hidden>▾</span>
              </button>
              <div className={`nav-dropdown-menu nav-mega-menu ${productDropdownOpen ? 'open' : ''}`} role="menu">
                <div className="nav-mega-menu-intro">
                  <h3 className="nav-mega-menu-title">Products</h3>
                  <p className="nav-mega-menu-copy">
                    Explore BioTap products built for seamless biometric payments, merchant operations, and secure
                    identity-based access.
                  </p>
                  <button
                    type="button"
                    className="nav-mega-menu-link"
                    onClick={() => handleProductMenuClick('expandable-cards')}
                  >
                    See products
                    <span className="material-icons" aria-hidden>
                      arrow_forward
                    </span>
                  </button>
                </div>
                <div className="nav-mega-menu-groups">
                  {PRODUCT_MENU_GROUPS.map((group) => (
                    <div key={group.title} className="nav-mega-menu-group">
                      <div className={`nav-mega-menu-group-title ${group.accentClass}`}>
                        <span className="nav-mega-menu-group-dot" aria-hidden />
                        {group.title}
                      </div>
                      <div className="nav-mega-menu-items">
                        {group.items.map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            className="nav-mega-menu-item"
                            onClick={() => handleProductMenuClick(item.sectionId)}
                          >
                            <span className="nav-mega-menu-item-label">
                              {item.label}
                              <span className="material-icons nav-mega-menu-item-icon" aria-hidden>
                                chevron_right
                              </span>
                            </span>
                            <span className="nav-mega-menu-item-description">{item.description}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li className="nav-dropdown-wrapper" ref={companyDropdownRef}>
              <button
                type="button"
                className="nav-dropdown-trigger"
                onClick={() => {
                  const next = !companyDropdownOpen;
                  setCompanyDropdownOpen(next);
                  if (next) setProductDropdownOpen(false);
                }}
                aria-expanded={companyDropdownOpen}
                aria-haspopup="true"
              >
                {t('nav.company')}
                <span className={`nav-dropdown-arrow ${companyDropdownOpen ? 'open' : ''}`} aria-hidden>▾</span>
              </button>
              <ul className={`nav-dropdown-menu ${companyDropdownOpen ? 'open' : ''}`} role="menu">
                <li>
                  <button
                    type="button"
                    className="nav-mega-menu-item"
                    onClick={() => handleCompanyMenuClick('contact')}
                  >
                    <span className="nav-mega-menu-item-label">Careers</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="nav-mega-menu-item"
                    onClick={() => handleCompanyMenuClick('contact')}
                  >
                    <span className="nav-mega-menu-item-label">Media</span>
                  </button>
                </li>
              </ul>
            </li>
            {navLinks.map((link) => (
              <li key={link.sectionId}>
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href, link.sectionId)}>{link.label}</a>
              </li>
            ))}
          </ul>

          {/* Desktop Actions: Get Started + Language */}
          <div className="nav-actions">
            <button
              type="button"
              className="btn btn-primary nav-get-started"
              onClick={() => openContactModal()}
            >
              {t('hero.cta')}
            </button>
            <LanguageSelector />
          </div>

          {/* Mobile Actions: Get Started + Language + Burger */}
          <div className="nav-actions-mobile">
            <button
              type="button"
              className="btn btn-primary nav-get-started"
              onClick={() => openContactModal()}
            >
              {t('hero.cta')}
            </button>
            <LanguageSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`burger-menu ${mobileMenuOpen ? 'active' : ''}`}
              id="burgerMenu"
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div className={`mobile-sidebar-overlay ${mobileMenuOpen ? 'active' : ''}`} id="mobileSidebarOverlay" onClick={() => setMobileMenuOpen(false)}></div>
      
      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${mobileMenuOpen ? 'active' : ''}`} id="mobileSidebar">
        <div className="mobile-sidebar-header">
          <Link href="/" className="mobile-sidebar-logo" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); window.history.pushState(null, '', '/'); }}>
            <Image
              src={`/images/logo.png?v=${LOGO_VERSION}`}
              alt="BioTap"
              width={32}
              height={32}
              unoptimized
            />
            <span className="logo-text" style={{ fontSize: '1.5rem' }}>BioTap</span>
          </Link>
          <button
            className="mobile-sidebar-close"
            id="mobileSidebarClose"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        <nav className="mobile-sidebar-nav">
          <ul>
            <li className="mobile-nav-dropdown">
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => {
                  const next = !productDropdownOpen;
                  setProductDropdownOpen(next);
                  if (next) setCompanyDropdownOpen(false);
                }}
              >
                {t('nav.product')}
                <span className={`nav-dropdown-arrow ${productDropdownOpen ? 'open' : ''}`} aria-hidden>▾</span>
              </button>
              <ul className={`mobile-nav-dropdown-menu ${productDropdownOpen ? 'open' : ''}`}>
                {PRODUCT_MENU_GROUPS.map((group) => (
                  <li key={group.title} className="mobile-nav-dropdown-group">
                    <div className="mobile-nav-dropdown-title">{group.title}</div>
                    <div className="mobile-nav-dropdown-items">
                      {group.items.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          className="mobile-nav-dropdown-item"
                          onClick={() => handleProductMenuClick(item.sectionId)}
                        >
                          <span>{item.label}</span>
                          <span className="material-icons" aria-hidden>
                            chevron_right
                          </span>
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mobile-nav-dropdown">
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => {
                  const next = !companyDropdownOpen;
                  setCompanyDropdownOpen(next);
                  if (next) setProductDropdownOpen(false);
                }}
              >
                {t('nav.company')}
                <span className={`nav-dropdown-arrow ${companyDropdownOpen ? 'open' : ''}`} aria-hidden>▾</span>
              </button>
              <ul className={`mobile-nav-dropdown-menu ${companyDropdownOpen ? 'open' : ''}`}>
                <li className="mobile-nav-dropdown-group">
                  <div className="mobile-nav-dropdown-items">
                    <button
                      type="button"
                      className="mobile-nav-dropdown-item"
                      onClick={() => handleCompanyMenuClick('contact')}
                    >
                      <span>Careers</span>
                      <span className="material-icons" aria-hidden>
                        chevron_right
                      </span>
                    </button>
                    <button
                      type="button"
                      className="mobile-nav-dropdown-item"
                      onClick={() => handleCompanyMenuClick('contact')}
                    >
                      <span>Media</span>
                      <span className="material-icons" aria-hidden>
                        chevron_right
                      </span>
                    </button>
                  </div>
                </li>
              </ul>
            </li>
            {navLinks.map((link) => (
              <li key={link.sectionId}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-sidebar-social">
          <h4>Follow Us</h4>
          <div className="mobile-social-links">
            <a
              href="https://instagram.com/biotap_app"
              className="instagram"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/biotap-services-limited/"
              className="linkedin"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://x.com/biotapapp"
              className="twitter"
              aria-label="X (Twitter)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

