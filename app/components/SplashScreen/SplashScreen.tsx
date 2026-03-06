'use client';

import Image from 'next/image';

const LOGO_VERSION = 1;

export default function SplashScreen({ visible }: { visible: boolean }) {
  return (
    <div
      className={`splash-screen ${!visible ? 'splash-screen--hidden' : ''}`}
      aria-label="BioTap"
    >
      <Image
        src={`/images/logo.png?v=${LOGO_VERSION}`}
        alt="BioTap"
        width={120}
        height={120}
        className="splash-screen-logo"
        priority
        unoptimized
      />
    </div>
  );
}
