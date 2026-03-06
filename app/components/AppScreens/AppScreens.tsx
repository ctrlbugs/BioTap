'use client';

import Image from 'next/image';

const SCREENS = [
  {
    image: '/images/splash1.png',
    eyebrow: 'BioTap Offline',
    title: 'Payments Without Barriers',
    description: 'BioTap enables secure payments anytime, anywhere—even without internet access.',
  },
  {
    image: '/images/Login.png',
    eyebrow: 'Biometric Login & Payment',
    title: 'One Touch Authentication',
    description: 'Secure access and authorize transactions instantly using your fingerprint or face.',
  },
];

export default function AppScreens() {
  return (
    <section className="app-screens-section" id="app-screens">
      <div className="app-screens-container">
        <div className="app-screens-header">
          <h2 className="app-screens-title">The Future of Payments, Unified</h2>
          <p className="app-screens-subtitle">
            All secured by your identity powered by advanced biometric technology for seamless, instant
            transactions.
          </p>
        </div>

        <div className="app-screens-grid">
          {SCREENS.map((screen) => (
            <article key={screen.title} className="app-screen-card">
              <div className="app-screen-card-header">
                <p className="app-screen-eyebrow">{screen.eyebrow}</p>
                <h3 className="app-screen-title">{screen.title}</h3>
                <p className="app-screen-description">{screen.description}</p>
              </div>

              <div className="app-screen-media" aria-hidden>
                <Image
                  src={screen.image}
                  alt=""
                  width={1200}
                  height={900}
                  quality={95}
                  unoptimized
                  className="app-screen-image"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

