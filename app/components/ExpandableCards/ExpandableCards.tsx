'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const EXPANDABLE_CARDS = [
  {
    image: '/images/Zero.png',
    label: 'Instant Payments',
    description: 'Fast. Secure. Confirmed in seconds.',
  },
  {
    image: '/images/Nocards.png',
    label: 'Remote Payments',
    description: 'Receive payments anytime, anywhere.',
  },
  {
    image: '/images/Network.png',
    label: 'Tap to Pay',
    description: 'Sell at your counter Fast checkout. Instant payment.',
  },
  {
    image: '/images/Onetime.png',
    label: 'Cardless Payments',
    description: 'Make secure payments without cards or cash',      
  },
];

export default function ExpandableCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 768);
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  const scrollToCard = (index: number) => {
    if (!isMobile) return;
    const card = cardRefs.current[index];
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    scrollToCard(index);
  };

  const handleMobileScroll = () => {
    if (!isMobile || !rowRef.current) return;

    const rowRect = rowRef.current.getBoundingClientRect();
    const rowCenter = rowRect.left + rowRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - rowCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  return (
    <section className="expandable-cards-section" id="expandable-cards">
      <div className="expandable-cards-container">
        <div className="expandable-cards-header">
          <h2 className="expandable-cards-title">The Right Payment Solution for Your Business</h2>
          <p className="expandable-cards-subtitle">
          From retail stores to hospitality and service brands, Biotap delivers fast, secure Tap & Pay technology that helps your business grow.
          </p>
          <nav className="expandable-cards-tabs" aria-label="Payment categories">
            {EXPANDABLE_CARDS.map((card, idx) => (
              <button
                key={card.label}
                type="button"
                className={`expandable-cards-tab ${idx === activeIndex ? 'is-active' : ''}`}
                onClick={() => handleTabClick(idx)}
                aria-current={idx === activeIndex ? 'true' : undefined}
              >
                {card.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="expandable-cards-row" ref={rowRef} onScroll={handleMobileScroll}>
          {EXPANDABLE_CARDS.map((card, idx) => (
            <article
              key={card.label}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className={`expandable-card ${idx === activeIndex ? 'is-active' : ''}`}
              tabIndex={0}
              onMouseEnter={() => setActiveIndex(idx)}
              onFocus={() => setActiveIndex(idx)}
              onClick={() => handleTabClick(idx)}
              role="button"
              aria-pressed={idx === activeIndex}
            >
              <Image
                src={card.image}
                alt={card.label}
                width={1200}
                height={1200}
                quality={95}
                unoptimized
                className="expandable-card-img"
              />
              <div className="expandable-card-overlay" aria-hidden />
              <div className="expandable-card-content">
                <p className="expandable-card-description">{card.description}</p>
                <span className="expandable-card-cta">
                  Explore
                  <span className="material-icons expandable-card-cta-icon" aria-hidden>
                    arrow_forward
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

