'use client';

import Image from 'next/image';
import { useContactModal } from '@/app/components/ContactModal/ContactModal';

export default function PressAndMedia() {
  const { openModal: openContactModal } = useContactModal();

  return (
    <section className="press-media-section" id="news">
      <div className="press-media-card fade-in">
        <div className="press-media-bg">
          <Image
            src="/images/update.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="press-media-image"
            priority
          />
          <div className="press-media-overlay" aria-hidden />
        </div>
        <div className="press-media-content">
          <h2 className="press-media-title">Press and media</h2>
          <p className="press-media-subtitle">
            For any enquiries, contact us at{' '}
            <a href="mailto:contact@biotapapp.com" className="press-media-email">
              contact@biotapapp.com
            </a>
          </p>
          <button
            type="button"
            className="press-media-btn"
            onClick={openContactModal}
          >
            Get in touch
            <span className="material-icons press-media-btn-icon" aria-hidden>
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
