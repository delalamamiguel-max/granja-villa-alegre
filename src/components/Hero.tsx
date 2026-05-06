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
      className="relative min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-6 text-5xl md:text-6xl">🌾</div>

        <h1 className="font-title text-4xl md:text-6xl font-bold text-app-text mb-4 leading-tight">
          Granja Villa Alegre
        </h1>

        <p className="text-xl md:text-2xl text-slate-700 mb-6 leading-relaxed max-w-3xl mx-auto">
          En Granja Villa Alegre, la tradición, la calidad y el amor por lo natural se encuentran en un mismo lugar. Una granja familiar en Misión Tres Ojitos, Chihuahua, dirigida por el Ing. Miguel Ángel de la Lama, donde cada producto nace del cuidado, la paciencia y la vida de campo.
        </p>

        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Productos 100% naturales, cremas artesanales, jabones medicinales y la calidez de una familia que ama lo que hace.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollToSection('productos')}
            className="btn-primary text-base px-8 py-3 inline-block"
          >
            Conoce nuestros productos
          </button>
          <a
            href="https://wa.me/526521031451"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-base px-8 py-3 inline-block"
          >
            Escríbenos por WhatsApp
          </a>
        </div>

        <div className="mt-12 text-sm text-slate-600">
          <p className="mb-2">📍 Ejido Tres Ojitos, Cd. Madera, Chihuahua</p>
          <p>📞 652 103 1451</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
