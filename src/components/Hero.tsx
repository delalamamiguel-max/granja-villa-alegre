export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-oat-surface"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <p className="text-xs font-medium uppercase tracking-widest text-soil-muted mb-8">
          Misión Tres Ojitos · Chihuahua, México
        </p>

        {/* Headline — Instrument Serif, clamp 3–5rem, italic second line */}
        <h1
          className="font-serif text-soil mb-8 leading-[1.05]"
          style={{ fontSize: 'clamp(3rem, 5vw + 1rem, 5rem)' }}
        >
          Granja{' '}
          <span className="italic">Villa Alegre</span>
        </h1>

        {/* Supporting copy — "natural" underlined in honey for editorial accent */}
        <p className="text-lg md:text-xl text-soil-secondary mb-5 leading-relaxed max-w-3xl mx-auto">
          En Granja Villa Alegre, la tradición, la calidad y el amor por lo{' '}
          <span className="border-b-2 border-honey">natural</span> se encuentran
          en un mismo lugar. Una granja familiar en Misión Tres Ojitos, Chihuahua,
          dirigida por el Ing. Miguel Ángel de la Lama, donde cada producto nace
          del cuidado, la paciencia y la vida de campo.
        </p>

        <p className="text-base text-soil-muted mb-12 max-w-2xl mx-auto">
          Productos 100% naturales, cremas artesanales, jabones medicinales y la
          calidez de una familia que ama lo que hace.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

        {/* Location + phone */}
        <div className="mt-14 text-sm text-soil-muted space-y-1">
          <p>Ejido Tres Ojitos, Cd. Madera, Chihuahua</p>
          <p>652 103 1451</p>
        </div>
      </div>
    </section>
  );
}
