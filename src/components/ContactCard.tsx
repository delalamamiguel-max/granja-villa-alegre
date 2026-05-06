export function ContactCard() {
  return (
    <section id="contacto" className="py-20 md:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact info */}
          <div>
            <h2
              className="font-serif text-soil mb-8 leading-[1.15]"
              style={{ fontSize: '2.25rem' }}
            >
              ¿Dónde nos encuentras?
            </h2>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-soil-muted mb-1">
                  Ubicación
                </p>
                <p className="text-lg text-soil">Ejido Tres Ojitos</p>
                <p className="text-soil-secondary">
                  Calle 12 y Avitia<br />
                  Cd. Madera, Chihuahua
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-soil-muted mb-1">
                  Teléfono
                </p>
                <a
                  href="tel:+526521031451"
                  className="text-lg text-terracotta hover:text-terracotta-dark transition-colors duration-150 font-medium"
                >
                  652 103 1451
                </a>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-soil-muted mb-1">
                  Responsable
                </p>
                <p className="text-lg text-soil">Ing. Miguel Ángel de la Lama</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-soil-muted mb-1">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/granjavillaalegre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-terracotta hover:text-terracotta-dark transition-colors duration-150 font-medium"
                >
                  @granjavillaalegre
                </a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col justify-center">
            <div className="rounded-xl bg-oat-surface border border-oat-border p-8">
              <h3 className="font-serif text-2xl text-soil mb-3 leading-snug">
                ¿Quieres conocer nuestros productos?
              </h3>
              <p className="text-soil-secondary mb-6 leading-relaxed">
                Contáctanos por WhatsApp para consultar disponibilidad de cremas
                artesanales, jabones naturales y más.
              </p>
              <a
                href="https://wa.me/526521031451"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                Escríbenos por WhatsApp
              </a>
              <p className="text-xs text-soil-muted text-center mt-4">
                Respuesta rápida y amable garantizada
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
