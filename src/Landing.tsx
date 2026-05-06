import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero, PhotoSlot } from './components/Hero';
import { SectionHeading } from './components/SectionHeading';
import { ProductCard } from './components/ProductCard';
import { AnimalCard } from './components/AnimalCard';
import { GalleryGrid } from './components/GalleryGrid';
import { ContactCard } from './components/ContactCard';

// ── Photo paths — fill these in as files land in public/images/ ──
const PHOTOS = {
  cremaRegeneradora: '/images/crema-regeneradora.jpg',
  caballoHero:       '/images/caballo-hero.jpg',
  gallinas:          '/images/gallinas.jpg',
  huevosCocina:      '/images/huevos-cocina.jpg',
  floresCampo:       '/images/flores-campo.jpg',
  cerdos:            '/images/cerdos.jpg',
  maternidad:        '/images/maternidad.jpg',
  calendulaMano:     '/images/calendula-mano.jpg',
  calendulaOlla:     '/images/calendula-olla.jpg',
  elaboracionCrema:  '/images/elaboracion-crema.jpg',
  elaboracionJabon:  '/images/elaboracion-jabon.jpg',
  ventanaTalavera:   '/images/ventana-talavera.jpg',
};

export function Landing() {
  // Scroll reveal — sections fade in 10px as they enter the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const creamProducts = [
    {
      name: 'Crema Regeneradora',
      description: 'Fórmula completa para regeneración y recuperación de la piel con aceite puro de cerdo orgánico.',
      usage: 'Aplicar mañana y noche en áreas que requieren cuidado especial.',
      icon: '✨',
      photo: PHOTOS.cremaRegeneradora,
    },
    {
      name: 'Crema Extra Humectante Corporal',
      description: 'Ideal para resequedad y humectación profunda de la piel con vitaminas E y K.',
      usage: 'Aplicar mañana y noche de forma abundante una o dos veces al día.',
      icon: '💧',
    },
    {
      name: 'Crema Regeneradora Facial con Caléndula',
      description: 'Especialmente formulada para el rostro con caléndula silvestre y lípidos naturales.',
      usage: 'Lavar la cara antes de aplicar; usar sobre el rostro. Después de unos minutos la piel la absorbe. Repetir en las noches.',
      icon: '🌸',
    },
    {
      name: 'Crema de Calostro de Bovino',
      description: 'Rica en nutrientes para apoyar el cuidado de manchas y humectación profunda.',
      usage: 'Aplicar en manos y cara; recomendada por las noches para disminuir manchas y humectar.',
      icon: '🥛',
    },
    {
      name: 'Crema Especial para Hemorroides',
      description: 'Fórmula específica para alivio y bienestar con ingredientes naturales.',
      usage: 'Aplicación nocturna, una vez por noche.',
      icon: '🌿',
    },
    {
      name: 'Crema de Tepezcohuite',
      description: 'Tradicionalmente usada para cicatrices y quemaduras con propiedades regenerativas.',
      usage: 'Aplicar varias veces según necesidad.',
      icon: '🍃',
    },
    {
      name: 'Crema Regeneradora para Ojos',
      description: 'Delicada fórmula para el contorno de ojos con humectación intensa.',
      usage: 'Aplicar por las noches con el contorno de ojos humectado para mejorar la sensación de la piel.',
      icon: '👁️',
    },
    {
      name: 'Aceite Natural Regenerador para el Cabello',
      description: 'Aceite puro de cerdo orgánico para revitalizar cabello y cuero cabelludo.',
      usage: 'Aplicar a lo largo del cabello y cuero cabelludo con masaje de yemas; usar cada tercer día.',
      icon: '💇',
    },
    {
      name: 'Crema para Várices Anti-Inflamatoria',
      description: 'Fórmula especial para apoyar el cuidado de piernas con efecto anti-inflamatorio.',
      usage: 'Aplicar antes de acostarse; si es posible cubrir con venda; solo untar.',
      icon: '🦵',
    },
    {
      name: 'Crema para Acné',
      description: 'Formulada para apoyar el cuidado de pieles propensas al acné con ingredientes naturales.',
      usage: 'Aplicar según sea necesario en áreas afectadas.',
      icon: '💚',
    },
  ];

  const soapProducts = [
    { name: 'Jabón de Caléndula', description: 'Para acompañar el cuidado de piel con tendencia al acné.' },
    { name: 'Jabón de Romero', description: 'Para uso en cabello y cuero cabelludo.' },
    { name: 'Jabón de Avena', description: 'Para rostro, humectación y suavidad.' },
    { name: 'Jabón de Perejil', description: 'Para apoyar el cuidado de manchas, ideal junto con crema de calostro.' },
    { name: 'Jabón de Tepezcohuite', description: 'Para piel con marcas, cicatrices o resequedad.' },
    { name: 'Jabón de Pepino', description: 'Para refrescar el rostro y apoyar el cuidado de bolsas en los ojos.' },
    { name: 'Jabón de Arroz', description: 'Inspirado en rutinas tradicionales de belleza para suavidad y apariencia uniforme del cutis.' },
  ];

  const animals = [
    { name: 'Kenya',  type: 'Yegua', emoji: '🐴', description: 'Una compañera elegante y noble que forma parte de la familia de Granja Villa Alegre.', photo: PHOTOS.caballoHero },
    { name: 'Canela', type: 'Yegua', emoji: '🐴', description: 'Cálida y protectora, Canela representa el espíritu familial de nuestro rancho.' },
    { name: 'Sombra', type: 'Husky', emoji: '🐕', description: 'Energético y leal, Sombra trae alegría y compañía a cada rincón de la granja.' },
    { name: 'Kelo',   type: 'Husky', emoji: '🐕', description: 'Juguetón y afectuoso, Kelo es el corazón de la familia de Granja Villa Alegre.' },
  ];

  const galleryItems = [
    { id: '1',  src: PHOTOS.gallinas,         alt: 'Animales de la granja' },
    { id: '2',  src: PHOTOS.ventanaTalavera,  alt: 'Vista de la granja' },
    { id: '3',  src: PHOTOS.elaboracionCrema, alt: 'Proceso artesanal' },
    { id: '4',  src: PHOTOS.caballoHero,      alt: 'Los caballos' },
    { id: '5',  src: PHOTOS.cremaRegeneradora,alt: 'Cremas naturales' },
    { id: '6',  src: PHOTOS.elaboracionJabon, alt: 'Jabones medicinales' },
    { id: '7',  src: PHOTOS.floresCampo,      alt: 'Vida de campo' },
    { id: '8',  src: PHOTOS.cerdos,           alt: 'Momentos especiales' },
    { id: '9',  src: PHOTOS.maternidad,       alt: 'La granja' },
  ];

  const processSteps = [
    { label: 'Caléndula silvestre', src: PHOTOS.calendulaMano },
    { label: 'Infusión natural',    src: PHOTOS.calendulaOlla },
    { label: 'Elaboración artesanal', src: PHOTOS.elaboracionCrema },
  ];

  return (
    <div className="min-h-screen bg-oat-base text-soil">
      <Navigation />
      <Hero />

      {/* ── Nuestra Historia ──────────────────────────────────────── */}
      <section id="historia" className="py-20 md:py-28 px-4 bg-oat-base section-reveal">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            emoji="📖"
            title="Nuestra Historia"
            subtitle="Tradición, cuidado y amor por lo natural"
          />
          {/* 50/50: text left, founder portrait right */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-base text-soil-secondary leading-relaxed mb-4">
                Granja Villa Alegre nace del sueño del Ing. Miguel Ángel de la Lama: crear un espacio donde la tradición y la naturaleza convergen en productos auténticos que cuiden la salud y el bienestar de la familia.
              </p>
              <p className="text-base text-soil-secondary leading-relaxed mb-4">
                Ubicada en Misión Tres Ojitos, Chihuahua, nuestra granja es un refugio de autenticidad donde cada producto es cuidadosamente elaborado con ingredientes naturales, sin compromisos y con el corazón.
              </p>
              <p className="text-base text-soil-secondary leading-relaxed mb-8">
                Desde cremas artesanales hasta jabones medicinales, desde huevos frescos hasta la convivencia diaria con nuestros animales de granja, todo en Granja Villa Alegre respira tradición, calidad y amor por lo natural.
              </p>

              {/* Trimmed to 2 bullets; remaining points merged into closing line */}
              <div className="bg-oat-elevated rounded-xl border border-oat-border p-7">
                <h3 className="font-serif text-xl text-soil mb-4">¿Qué nos hace especiales?</h3>
                <ul className="space-y-3 mb-4">
                  <li className="flex gap-4 items-start">
                    <span className="mt-2.5 w-4 h-px bg-terracotta shrink-0 block"></span>
                    <span className="text-soil-secondary text-sm">
                      <strong className="text-soil font-medium">Productos 100% naturales</strong>{' '}
                      sin aditivos sintéticos
                    </span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="mt-2.5 w-4 h-px bg-terracotta shrink-0 block"></span>
                    <span className="text-soil-secondary text-sm">
                      <strong className="text-soil font-medium">Elaboración artesanal</strong>{' '}
                      con dedicación familiar
                    </span>
                  </li>
                </ul>
                <p className="text-xs text-soil-muted leading-relaxed">
                  Cerdo orgánico de la granja y fórmulas tradicionales transmitidas entre generaciones.
                </p>
              </div>
            </div>

            {/* Founder portrait slot — aspect 3:4 */}
            <div>
              <PhotoSlot
                src={PHOTOS.ventanaTalavera}
                alt="Ing. Miguel Ángel de la Lama"
                aspectRatio="3 / 4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Vida en la Granja ─────────────────────────────────────── */}
      <section id="vida" className="py-20 md:py-28 px-4 bg-oat-surface section-reveal">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            emoji="🐔"
            title="Vida en la Granja"
            subtitle="Autenticidad, naturaleza y cuidado diario"
          />

          {/* Editorial photo grid: 3 images with 1-line captions */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { src: PHOTOS.gallinas,    caption: 'Gallinas — huevos frescos cada día' },
              { src: PHOTOS.maternidad,  caption: 'Vida en la granja' },
              { src: PHOTOS.floresCampo, caption: 'Flores silvestres del campo' },
            ].map(({ src, caption }) => (
              <div key={caption}>
                <PhotoSlot src={src} alt={caption} aspectRatio="4 / 3" />
                <p className="mt-2 text-xs text-soil-muted font-medium text-center">{caption}</p>
              </div>
            ))}
          </div>

          {/* Stacked definition list */}
          <div className="divide-y divide-oat-border mb-10">
            <div className="py-6 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-12">
              <h3 className="font-serif text-2xl text-soil sm:w-44 shrink-0">Gallinas</h3>
              <p className="text-soil-secondary leading-relaxed">
                Huevos frescos cada día, alimentadas con cuidado en un ambiente natural y tranquilo.
              </p>
            </div>
            <div className="py-6 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-12">
              <h3 className="font-serif text-2xl text-soil sm:w-44 shrink-0">Guajolotes</h3>
              <p className="text-soil-secondary leading-relaxed">
                Aves majestuosas que enriquecen la biodiversidad y el encanto de nuestra granja.
              </p>
            </div>
            <div className="py-6 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-12">
              <h3 className="font-serif text-2xl text-soil sm:w-44 shrink-0">Pavorreales</h3>
              <p className="text-soil-secondary leading-relaxed">
                Con su belleza incomparable, los pavorreales son la joya visual de Granja Villa Alegre.
              </p>
            </div>
          </div>

          <div className="bg-oat-elevated rounded-xl border border-oat-border p-8">
            <p className="text-base text-soil-secondary leading-relaxed text-center">
              En Granja Villa Alegre, cada día es una celebración de la vida de campo. Nuestros animales viven en libertad, alimentados naturalmente y cuidados con afecto. Esta conexión auténtica con la naturaleza es el corazón de todo lo que hacemos.
            </p>
          </div>
        </div>
      </section>

      {/* ── Cremas Artesanales ────────────────────────────────────── */}
      <section id="productos" className="py-20 md:py-28 px-4 bg-oat-base section-reveal">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            emoji="✨"
            title="Cremas Artesanales Naturales"
            subtitle="Formuladas con ingredientes naturales: lípidos, vitaminas E y K, caléndula silvestre y aceite puro de cerdo orgánico"
          />

          {/* Process strip — shows the making story without any text */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {processSteps.map(({ label, src }) => (
              <div key={label} className="text-center">
                <PhotoSlot src={src} alt={label} aspectRatio="1 / 1" />
                <p className="mt-2 text-xs text-soil-muted font-medium">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creamProducts.map((product, idx) => (
              <ProductCard
                key={idx}
                name={product.name}
                description={product.description}
                usage={product.usage}
                icon={product.icon}
                photo={product.photo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Jabones Naturales ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 bg-oat-surface section-reveal">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            emoji="🧼"
            title="Jabones Naturales y Medicinales"
            subtitle="Cuidado artesanal para piel y cabello"
          />

          {/* Panoramic intro image — soap pouring process */}
          <div className="mb-10">
            <PhotoSlot
              src={PHOTOS.elaboracionJabon}
              alt="Jabones artesanales"
              aspectRatio="16 / 5"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {soapProducts.map((soap, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-oat-border bg-oat-elevated p-6 shadow-soft hover:shadow-card transition-shadow duration-200"
              >
                <h3 className="font-serif text-lg text-soil mb-2">{soap.name}</h3>
                <p className="text-sm text-soil-secondary leading-relaxed">{soap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Animales de la Granja ─────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 bg-oat-base section-reveal">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            emoji="🐴"
            title="Animales de la Granja"
            subtitle="Los compañeros que hacen especial a Granja Villa Alegre"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {animals.map((animal, idx) => (
              <AnimalCard key={idx} {...animal} />
            ))}
          </div>
          {/* Piglet photo + ingredient tie-in */}
          <div className="mt-8 grid md:grid-cols-2 gap-6 items-center">
            <PhotoSlot
              src={PHOTOS.cerdos}
              alt="Cerdo orgánico de la granja"
              aspectRatio="4 / 3"
            />
            <div className="bg-oat-elevated rounded-xl border border-oat-border p-8">
              <p className="text-base text-soil-secondary leading-relaxed">
                Kenya, Canela, Sombra y Kelo son más que animales de granja; son parte de la familia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Galería ───────────────────────────────────────────────── */}
      <section id="galeria" className="py-20 md:py-28 px-4 bg-oat-surface section-reveal">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            emoji="📸"
            title="Galería"
            subtitle="Momentos de vida, naturaleza y tradición"
          />
          <GalleryGrid items={galleryItems} />
        </div>
      </section>

      {/* ── Contacto ──────────────────────────────────────────────── */}
      <section className="bg-oat-base">
        <ContactCard />
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="border-t border-oat-border bg-oat-surface py-10 px-4 text-center text-sm text-soil-muted">
        <p>Granja Villa Alegre © 2026 | Misión Tres Ojitos, Chihuahua, México</p>
        <p className="mt-2">Hecho con amor 💚 por el Ing. Miguel Ángel de la Lama</p>
      </footer>
    </div>
  );
}
