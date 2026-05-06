import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { SectionHeading } from './components/SectionHeading';
import { ProductCard } from './components/ProductCard';
import { AnimalCard } from './components/AnimalCard';
import { GalleryGrid } from './components/GalleryGrid';
import { ContactCard } from './components/ContactCard';

export function Landing() {
  const creamProducts = [
    {
      name: 'Crema Regeneradora',
      description: 'Fórmula completa para regeneración y recuperación de la piel con aceite puro de cerdo orgánico.',
      usage: 'Aplicar mañana y noche en áreas que requieren cuidado especial.',
      icon: '✨'
    },
    {
      name: 'Crema Extra Humectante Corporal',
      description: 'Ideal para resequedad y humectación profunda de la piel con vitaminas E y K.',
      usage: 'Aplicar mañana y noche de forma abundante una o dos veces al día.',
      icon: '💧'
    },
    {
      name: 'Crema Regeneradora Facial con Caléndula',
      description: 'Especialmente formulada para el rostro con caléndula silvestre y lípidos naturales.',
      usage: 'Lavar la cara antes de aplicar; usar sobre el rostro. Después de unos minutos la piel la absorbe. Repetir en las noches.',
      icon: '🌸'
    },
    {
      name: 'Crema de Calostro de Bovino',
      description: 'Rica en nutrientes para apoyar el cuidado de manchas y humectación profunda.',
      usage: 'Aplicar en manos y cara; recomendada por las noches para disminuir manchas y humectar.',
      icon: '🥛'
    },
    {
      name: 'Crema Especial para Hemorroides',
      description: 'Fórmula específica para alivio y bienestar con ingredientes naturales.',
      usage: 'Aplicación nocturna, una vez por noche.',
      icon: '🌿'
    },
    {
      name: 'Crema de Tepezcohuite',
      description: 'Tradicionalmente usada para cicatrices y quemaduras con propiedades regenerativas.',
      usage: 'Aplicar varias veces según necesidad.',
      icon: '🍃'
    },
    {
      name: 'Crema Regeneradora para Ojos',
      description: 'Delicada fórmula para el contorno de ojos con humectación intensa.',
      usage: 'Aplicar por las noches con el contorno de ojos humectado para mejorar la sensación de la piel.',
      icon: '👁️'
    },
    {
      name: 'Aceite Natural Regenerador para el Cabello',
      description: 'Aceite puro de cerdo orgánico para revitalizar cabello y cuero cabelludo.',
      usage: 'Aplicar a lo largo del cabello y cuero cabelludo con masaje de yemas; usar cada tercer día.',
      icon: '💇'
    },
    {
      name: 'Crema para Várices Anti-Inflamatoria',
      description: 'Fórmula especial para apoyar el cuidado de piernas con efecto anti-inflamatorio.',
      usage: 'Aplicar antes de acostarse; si es posible cubrir con venda; solo untar.',
      icon: '🦵'
    },
    {
      name: 'Crema para Acné',
      description: 'Formulada para apoyar el cuidado de pieles propensas al acné con ingredientes naturales.',
      usage: 'Aplicar según sea necesario en áreas afectadas.',
      icon: '💚'
    }
  ];

  const soapProducts = [
    { name: 'Jabón de Caléndula', description: 'Para acompañar el cuidado de piel con tendencia al acné.' },
    { name: 'Jabón de Romero', description: 'Para uso en cabello y cuero cabelludo.' },
    { name: 'Jabón de Avena', description: 'Para rostro, humectación y suavidad.' },
    { name: 'Jabón de Perejil', description: 'Para apoyar el cuidado de manchas, ideal junto con crema de calostro.' },
    { name: 'Jabón de Tepezcohuite', description: 'Para piel con marcas, cicatrices o resequedad.' },
    { name: 'Jabón de Pepino', description: 'Para refrescar el rostro y apoyar el cuidado de bolsas en los ojos.' },
    { name: 'Jabón de Arroz', description: 'Inspirado en rutinas tradicionales de belleza para suavidad y apariencia uniforme del cutis.' }
  ];

  const animals = [
    {
      name: 'Kenya',
      type: 'Yegua',
      emoji: '🐴',
      description: 'Una compañera elegante y noble que forma parte de la familia de Granja Villa Alegre.'
    },
    {
      name: 'Canela',
      type: 'Yegua',
      emoji: '🐴',
      description: 'Cálida y protectora, Canela representa el espíritu familial de nuestro rancho.'
    },
    {
      name: 'Sombra',
      type: 'Husky',
      emoji: '🐕',
      description: 'Energético y leal, Sombra trae alegría y compañía a cada rincón de la granja.'
    },
    {
      name: 'Kelo',
      type: 'Husky',
      emoji: '🐕',
      description: 'Juguetón y afectuoso, Kelo es el corazón de la familia de Granja Villa Alegre.'
    }
  ];

  const galleryItems = [
    { id: '1', src: '/images/granja-hero.jpg', alt: 'Vista de Granja Villa Alegre' },
    { id: '2', src: '/images/cremas-naturales.jpg', alt: 'Cremas artesanales naturales' },
    { id: '3', src: '/images/jabones.jpg', alt: 'Jabones medicinales' },
    { id: '4', src: '/images/yeguas.jpg', alt: 'Yeguas Kenya y Canela' },
    { id: '5', src: '/images/huskies.jpg', alt: 'Huskies Sombra y Kelo' },
    { id: '6', src: '/images/vida-granja.jpg', alt: 'Vida cotidiana en la granja' }
  ];

  return (
    <div className="min-h-screen bg-app-bg text-app-text">
      <Navigation />
      <Hero />

      {/* Nuestra Historia */}
      <section id="historia" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            emoji="📖"
            title="Nuestra Historia"
            subtitle="Tradición, cuidado y amor por lo natural"
          />
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Granja Villa Alegre nace del sueño del Ing. Miguel Ángel de la Lama: crear un espacio donde la tradición y la naturaleza convergen en productos auténticos que cuiden la salud y el bienestar de la familia.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Ubicada en Misión Tres Ojitos, Chihuahua, nuestra granja es un refugio de autenticidad donde cada producto es cuidadosamente elaborado con ingredientes naturales, sin compromisos y con el corazón.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Desde cremas artesanales hasta jabones medicinales, desde huevos frescos hasta la convivencia diaria con nuestros animales de granja, todo en Granja Villa Alegre respira tradición, calidad y amor por lo natural.
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
              <h3 className="font-title text-2xl font-bold text-app-text mb-4">
                ¿Qué nos hace especiales?
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-xl">🌾</span>
                  <span className="text-slate-700"><strong>Productos 100% naturales</strong> sin aditivos sintéticos</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl">👨‍🌾</span>
                  <span className="text-slate-700"><strong>Elaboración artesanal</strong> con dedicación familiar</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl">🐖</span>
                  <span className="text-slate-700"><strong>Cerdo orgánico</strong> alimentado con los mejores cuidados</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl">💚</span>
                  <span className="text-slate-700"><strong>Fórmulas tradicionales</strong> transmitidas con generaciones</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vida en la Granja */}
      <section id="vida" className="py-16 md:py-24 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            emoji="🐔"
            title="Vida en la Granja"
            subtitle="Autenticidad, naturaleza y cuidado diario"
          />
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-2xl bg-white border border-app-border p-6 shadow-soft text-center">
              <div className="text-4xl mb-3">🐔</div>
              <h3 className="font-title text-lg font-bold text-app-text mb-2">
                Gallinas
              </h3>
              <p className="text-slate-700">
                Huevos frescos cada día, alimentadas con cuidado en un ambiente natural y tranquilo.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-app-border p-6 shadow-soft text-center">
              <div className="text-4xl mb-3">🦃</div>
              <h3 className="font-title text-lg font-bold text-app-text mb-2">
                Guajolotes
              </h3>
              <p className="text-slate-700">
                Aves majestuosas que enriquecen la biodiversidad y el encanto de nuestra granja.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-app-border p-6 shadow-soft text-center">
              <div className="text-4xl mb-3">🦚</div>
              <h3 className="font-title text-lg font-bold text-app-text mb-2">
                Pavorreales
              </h3>
              <p className="text-slate-700">
                Con su belleza incomparable, los pavorreales son la joya visual de Granja Villa Alegre.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-app-border p-8">
            <p className="text-lg text-slate-700 leading-relaxed text-center">
              En Granja Villa Alegre, cada día es una celebración de la vida de campo. Nuestros animales viven en libertad, alimentados naturalmente y cuidados con afecto. Esta conexión auténtica con la naturaleza es el corazón de todo lo que hacemos.
            </p>
          </div>
        </div>
      </section>

      {/* Cremas Naturales */}
      <section id="productos" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            emoji="✨"
            title="Cremas Artesanales Naturales"
            subtitle="Formuladas con ingredientes naturales: lípidos, vitaminas E y K, caléndula silvestre y aceite puro de cerdo orgánico"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creamProducts.map((product, idx) => (
              <ProductCard
                key={idx}
                name={product.name}
                description={product.description}
                usage={product.usage}
                icon={product.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Jabones Naturales */}
      <section className="py-16 md:py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            emoji="🧼"
            title="Jabones Naturales y Medicinales"
            subtitle="Cuidado artesanal para piel y cabello"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {soapProducts.map((soap, idx) => (
              <div key={idx} className="rounded-2xl border border-app-border bg-white p-6 shadow-soft hover:shadow-md transition">
                <h3 className="font-title text-lg font-bold text-app-text mb-2">
                  {soap.name}
                </h3>
                <p className="text-sm text-slate-700">
                  {soap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animales de la Granja */}
      <section className="py-16 md:py-24 px-4 bg-white">
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
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border border-blue-200 p-8 text-center">
            <p className="text-lg text-slate-700 leading-relaxed">
              Kenya, Canela, Sombra y Kelo son más que animales de granja; son parte de la familia. Su presencia, afecto y compañía hacen que cada día en Granja Villa Alegre sea especial y lleno de vida.
            </p>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="py-16 md:py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            emoji="📸"
            title="Galería"
            subtitle="Momentos de vida, naturaleza y tradición"
          />
          <GalleryGrid items={galleryItems} />
        </div>
      </section>

      {/* Contacto */}
      <section className="bg-white">
        <ContactCard />
      </section>

      {/* Footer */}
      <footer className="border-t border-app-border bg-slate-50 py-8 px-4 text-center text-sm text-slate-600">
        <p>
          Granja Villa Alegre © 2026 | Misión Tres Ojitos, Chihuahua, México
        </p>
        <p className="mt-2">
          Hecho con amor 💚 por el Ing. Miguel Ángel de la Lama
        </p>
      </footer>
    </div>
  );
}
