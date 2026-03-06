'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({ percent: 0, identity: 0, network: 0, corePillars: 0 });

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        setHasAnimated(true);

        if (prefersReducedMotion) {
          setCounts({ percent: 100, identity: 1, network: 1, corePillars: 3 });
          return;
        }

        const durationMs = 1400;
        const start = performance.now();

        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const e = easeOutCubic(t);
          setCounts({
            percent: Math.round(100 * e),
            identity: Math.round(1 * e),
            network: Math.round(1 * e),
            corePillars: Math.round(3 * e),
          });
          if (t < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="about-section about-v2 fade-in" id="about">
      <div className="about-container about-v2-container">
        <p className="about-v2-caption">Why we exist</p>
        <div className="about-v2-grid">
          <div className="about-v2-left">
            <h2 className="about-v2-title">Powering the Future of Payments with a Touch</h2>

            <div className="about-v2-body">
              <p className="about-v2-paragraph">
                BioTap Services Ltd is a technology-driven fintech company redefining biometric payment solutions
                across Africa. We enable users to pay for goods and services simply by scanning their
                fingerprint, with no cards, no cash, and no phones required.
              </p>

              <p className="about-v2-paragraph">
                Our mission is simple yet transformative: to make payments faster, safer, and more human. By
                merging advanced biometric technology with modern financial infrastructure, BioTap delivers a
                seamless and secure transaction experience across both physical and digital environments.
              </p>

              <p className="about-v2-paragraph">
                We are building more than a payment platform and creating an inclusive financial ecosystem.
                Rooted in innovation, data privacy, and accessibility, BioTap empowers individuals and businesses
                alike, including those in low-connectivity environments, to transact confidently using just their
                fingerprint.
              </p>

              <div className="about-v2-countries" aria-label="Benin, Togo, Nigeria, Ghana, South Africa">
                <div className="about-v2-country-flags" aria-hidden>
                  <span className="about-v2-flag">🇳🇬</span>
                  <span className="about-v2-flag">🇧🇯</span>
                  <span className="about-v2-flag">🇹🇬</span>
                  <span className="about-v2-flag">🇬🇭</span>
                  <span className="about-v2-flag">🇿🇦</span>
                </div>
                <div className="about-v2-stat-label">Building Africa’s Next Biometric Payment Network</div>
              </div>

              <div className="about-v2-vision">
                <span className="about-v2-vision-lead">As we expand across Africa, our vision remains clear:</span>
                <span className="about-v2-vision-main">
                  to redefine digital payments through convenience, speed, security, and true financial inclusion.
                </span>
              </div>
            </div>
          </div>

          <div className="about-v2-right" aria-label="BioTap highlights">
            <div className="about-v2-stats">
              <div className="about-v2-stat">
                <div className="about-v2-stat-number">{counts.identity}</div>
                <div className="about-v2-stat-label">
                  <span className="about-v2-stat-label-title">Identity</span>
                  <span className="about-v2-stat-label-sub">One fingerprint powering secure payments</span>
                </div>
              </div>

              <div className="about-v2-stat">
                <div className="about-v2-stat-number">{counts.network}</div>
                <div className="about-v2-stat-label">
                  <span className="about-v2-stat-label-title">Biometric Network</span>
                  <span className="about-v2-stat-label-sub">Connecting users, merchants, and banks</span>
                </div>
              </div>

              <div className="about-v2-stat">
                <div className="about-v2-stat-number">{counts.corePillars}</div>
                <div className="about-v2-stat-label">
                  <span className="about-v2-stat-label-title">Core Pillars</span>
                  <span className="about-v2-stat-label-sub">Security • Speed • Financial Inclusion</span>
                </div>
              </div>

              <div className="about-v2-stat">
                <div className="about-v2-stat-number">{counts.percent}<span className="about-v2-stat-percent">%</span></div>
                <div className="about-v2-stat-label">
                  <span className="about-v2-stat-label-title">Biometric</span>
                  <span className="about-v2-stat-label-sub">No cards • No cash • No phones required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

