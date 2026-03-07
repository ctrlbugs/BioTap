'use client';

import Image from 'next/image';

const PRODUCTS = [
  { title: 'Card machines', image: '/images/pos.png' },
  { title: 'Point of sale', image: '/images/pos2.png' },
  { title: 'Offline Payment', image: '/images/pos.png' },
  { title: 'Inventory Management', image: '/images/Inventory.png' },
];

export default function ConnectedProducts() {
  const handleMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
  };

  return (
    <section className="connected-products-section" id="connected-products">
      <div className="connected-products-container">
        <div className="connected-products-header">
          <h2 className="connected-products-title">Discover our suite of connected products.</h2>
          <p className="connected-products-subtitle">
            Everything you need to accept payments, manage sales, and grow—built to work seamlessly together.
          </p>
        </div>

        <div className="connected-products-grid">
          {PRODUCTS.map((p) => (
            <article
              key={p.title}
              className="connected-product-card"
              onMouseMove={handleMove}
              onMouseEnter={handleMove}
            >
              <h3 className="connected-product-title">{p.title}</h3>
              <div className="connected-product-media" aria-hidden>
                <Image
                  src={p.image}
                  alt=""
                  width={900}
                  height={700}
                  quality={95}
                  unoptimized
                  className="connected-product-image"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

