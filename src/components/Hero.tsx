import React from 'react';

const HERO_PHOTO = '/images/huevos-cocina.jpg';

/** Renders a real photo, falling back to an oat-gradient placeholder if the file isn't there yet. */
function PhotoSlot({
  src,
  alt,
  aspectRatio = '3 / 4',
  className = '',
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
}) {
  const [loaded, setLoaded] = React.useState<boolean | null>(null);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-oat-border ${className}`}
      style={{ aspectRatio }}
    >
      {/* Real photo — hidden until it loads; on error stays hidden */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: loaded === true ? 'block' : 'none' }}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
      {/* Placeholder — shown only when photo is absent */}
      {loaded !== true && (
        <div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{
            background: 'linear-gradient(135deg, var(--bg-surface), var(--border-subtle))',
          }}
        >
          <span className="font-serif italic text-sm text-soil-muted text-center leading-snug">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="bg-oat-surface px-4 py-16 md:py-0 md:min-h-screen md:flex md:items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* ── Left: headline + CTAs ── */}
          <div className="py-8 md:py-20">
            <p className="text-xs font-medium uppercase tracking-widest text-soil-muted mb-8">
              Misión Tres Ojitos · Chihuahua, México
            </p>

            <h1
              className="font-serif text-soil mb-6 leading-[1.05]"
              style={{ fontSize: 'clamp(2.75rem, 5vw + 1rem, 4.75rem)' }}
            >
              Granja{' '}
              <span className="italic">Villa Alegre</span>
            </h1>

            <p className="text-lg text-soil-secondary mb-5 leading-relaxed max-w-[52ch]">
              En Granja Villa Alegre, la tradición, la calidad y el amor por lo{' '}
              <span className="border-b-2 border-honey">natural</span> se encuentran
              en un mismo lugar. Una granja familiar en Misión Tres Ojitos, Chihuahua,
              dirigida por el Ing. Miguel Ángel de la Lama, donde cada producto nace
              del cuidado, la paciencia y la vida de campo.
            </p>

            <p className="text-base text-soil-muted mb-10 max-w-[48ch]">
              Productos 100% naturales, cremas artesanales, jabones medicinales y la
              calidez de una familia que ama lo que hace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('productos')}
                className="btn-primary text-base"
              >
                Conoce nuestros productos
              </button>
              <a
                href="https://wa.me/526521031451"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-base"
              >
                Escríbenos por WhatsApp
              </a>
            </div>

            <div className="mt-10 text-sm text-soil-muted space-y-1">
              <p>Ejido Tres Ojitos, Cd. Madera, Chihuahua</p>
              <p>652 103 1451</p>
            </div>
          </div>

          {/* ── Right: farm photo, tall portrait frame ── */}
          {/* order-last on mobile so headline reads first */}
          <div className="order-last md:order-none md:py-12">
            <PhotoSlot
              src={HERO_PHOTO}
              alt="foto de la granja"
              aspectRatio="3 / 4"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export { PhotoSlot };
