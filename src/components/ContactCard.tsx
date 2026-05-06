export function ContactCard() {
  return (
    <section id="contacto" className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h2 className="font-title text-3xl font-bold text-app-text mb-6">
              ¿Dónde nos encuentras?
            </h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                  📍 Ubicación
                </p>
                <p className="text-lg text-app-text mt-1">
                  Ejido Tres Ojitos
                </p>
                <p className="text-slate-700">
                  Calle 12 y Avitia<br />
                  Cd. Madera, Chihuahua
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                  📞 Teléfono
                </p>
                <a
                  href="tel:+526521031451"
                  className="text-lg text-app-primary hover:underline font-semibold"
                >
                  652 103 1451
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                  👤 Responsable
                </p>
                <p className="text-lg text-app-text mt-1">
                  Ing. Miguel Ángel de la Lama
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                  📱 Instagram
                </p>
                <a
                  href="https://instagram.com/granjavillaalegre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-app-primary hover:underline font-semibold"
                >
                  @granjavillaalegre
                </a>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col justify-center">
            <div className="rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 p-8">
              <h3 className="font-title text-2xl font-bold text-app-text mb-3">
                ¿Quieres conocer nuestros productos?
              </h3>
              <p className="text-slate-700 mb-6">
                Contáctanos por WhatsApp para consultar disponibilidad de cremas artesanales, jabones naturales y más.
              </p>
              <a
                href="https://wa.me/526521031451"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block w-full text-center font-semibold"
              >
                💬 Escríbenos por WhatsApp
              </a>
              <p className="text-xs text-slate-600 text-center mt-4">
                Respuesta rápida y amable garantizada
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
