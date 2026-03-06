'use client';

import Image from 'next/image';

const FEATURE_CARDS = [
  {
    icon: 'payments',
    title: 'Send Money',
    description: 'Transfer funds instantly and securely to anyone within the Biotap network.',
  },
  {
    icon: 'savings',
    title: 'Receive Money',
    description: 'Accept payments seamlessly with real-time confirmation and biometric security.',
  },
  {
    image: '/images/Tap & Pay.png',
    title: 'Tap & Pay',
    description: 'Make fast, contactless payments using secure biometric authentication.',
  },
  {
    image: '/images/Tap4me.png',
    title: 'Tap4Me',
    description: 'Request payments effortlessly send a tap request and get paid instantly.',
  },
];

export default function FeatureCards() {
  return (
    <section className="feature-cards-section" id="feature-cards">
      <div className="feature-cards-container">
        {FEATURE_CARDS.map((card, index) => (
          <div key={card.title} className={`feature-card feature-card-${index + 1} fade-in`}>
            {'image' in card ? (
              <div className="feature-card-icon feature-card-icon-image">
                <Image src={card.image as string} alt={card.title} width={48} height={48} />
              </div>
            ) : (
              <span className="material-icons feature-card-icon">{card.icon}</span>
            )}
            <h3 className="feature-card-title">{card.title}</h3>
            <p className="feature-card-description">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
