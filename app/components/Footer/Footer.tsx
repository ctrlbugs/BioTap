'use client';

import Image from 'next/image';
import { useContactModal } from '@/app/components/ContactModal/ContactModal';

const LOGO_VERSION = 1;

const FOOTER_GROUPS: Array<{
  title: string;
  titleHref?: string;
  titleSectionId?: string;
  links: Array<
    | { label: string; href: string; sectionId?: string; strong?: boolean }
    | { label: string; href: string; onClick: 'contactModal'; strong?: boolean }
  >;
}> = [
  {
    title: 'Home',
    titleHref: '#',
    titleSectionId: 'hero',
    links: [
      { label: 'Products', href: '#', sectionId: 'connected-products' },
      { label: 'Solution', href: '#', sectionId: 'expandable-cards' },
      { label: 'Company', href: '/about', sectionId: 'about' },
      { label: 'Fraud and Security', href: '#', sectionId: 'contact' },
    ],
  },
  {
    title: 'Media',
    links: [
      { label: 'Blog', href: '#', sectionId: 'contact' },
      { label: 'Careers', href: '#', sectionId: 'contact' },
      { label: 'Developers / SDK', href: '#', sectionId: 'contact' },
    ],
  },
  {
    title: 'Business tools',
    links: [
      { label: 'Point of Sale', href: '#', sectionId: 'connected-products' },
      { label: 'Tap to Pay', href: '#', sectionId: 'expandable-cards' },
      { label: 'Offline Payment', href: '#', sectionId: 'connected-products' },
      { label: 'Inventory Management', href: '#', sectionId: 'connected-products' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Need help?', href: '#', onClick: 'contactModal' },
      { label: 'Contact Sales', href: '#', onClick: 'contactModal' },
      { label: 'Contact Support', href: '#', onClick: 'contactModal' },
      { label: 'Visit Help Centre', href: '#', onClick: 'contactModal' },
    ],
  },
  {
    title: 'Complaints',
    links: [
      { label: 'complaint@biotapapp.com', href: 'mailto:complaint@biotapapp.com' },
      { label: 'Disputes', href: '#', onClick: 'contactModal', strong: true },
      { label: 'chargebacks@biotapapp.com', href: 'mailto:chargebacks@biotapapp.com' },
      { label: 'Privacy Policy', href: '#', sectionId: 'contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'legal@biotapapp.com', href: 'mailto:legal@biotapapp.com' },
      { label: 'Press & Media', href: '#', sectionId: 'contact', strong: true },
      { label: 'media@biotapapp.com', href: 'mailto:media@biotapapp.com' },
      { label: 'Cookie policy', href: '#', sectionId: 'contact' },
    ],
  },
];

export default function Footer() {
  const { openModal: openContactModal } = useContactModal();

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string, href: string) => {
    e.preventDefault();
    if (sectionId === 'contact') {
      openContactModal();
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.history.pushState(null, '', href);
  };
  return (
    <footer className="footer">
      <div className="footer-content">
        {FOOTER_GROUPS.map((group) => (
          <div key={group.title} className="footer-col">
            <h4>
              {group.titleHref ? (
                <a
                  href={group.titleHref}
                  onClick={(e) =>
                    group.titleSectionId
                      ? handleSectionClick(e, group.titleSectionId, group.titleHref ?? '#')
                      : undefined
                  }
                >
                  {group.title}
                </a>
              ) : (
                group.title
              )}
            </h4>
            <ul>
              {group.links.map((link) => {
                const isLaptopHiddenLink = link.label === 'chargebacks@biotapapp.com';

                if ('onClick' in link && link.onClick === 'contactModal') {
                  return (
                    <li key={link.label} className={isLaptopHiddenLink ? 'footer-link-laptop-hidden' : undefined}>
                      <a
                        href={link.href}
                        className={link.strong ? 'footer-link-strong' : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          openContactModal();
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                }

                const sectionId = 'sectionId' in link ? link.sectionId : undefined;
                return (
                  <li key={link.label} className={isLaptopHiddenLink ? 'footer-link-laptop-hidden' : undefined}>
                    <a
                      href={link.href}
                      className={'strong' in link && link.strong ? 'footer-link-strong' : undefined}
                      onClick={(e) => (sectionId ? handleSectionClick(e, sectionId, link.href) : undefined)}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <div className="footer-brandline">
            <Image
              src={`/images/logo-white.png?v=${LOGO_VERSION}`}
              alt="BioTap"
              width={28}
              height={28}
              className="footer-logo-img footer-logo-img--white"
              unoptimized
            />
            <span className="footer-brandline-name">BioTap</span>
            <span className="footer-brandline-year">&copy; {new Date().getFullYear()}</span>
          </div>
        </div>

        <div className="social-links">
          <a href="instagram.com/biotap_app" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="linkedin.com/company/biotap-services-limited/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="x.com/biotapapp" target="_blank" rel="noopener noreferrer" aria-label="X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>

        <div className="footer-locale">
          <span className="footer-locale-text">Nigeria - Eng</span>
          <span className="material-icons footer-locale-icon" aria-hidden>
            public
          </span>
        </div>
      </div>
    </footer>
  );
}
