export function Navigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-app-border bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <button
          onClick={() => scrollToSection('hero')}
          className="font-title text-lg font-bold text-app-text hover:opacity-75 transition"
        >
          🌾 Granja Villa Alegre
        </button>
        <div className="hidden md:flex gap-1">
          <NavLink onClick={() => scrollToSection('historia')}>Nuestra historia</NavLink>
          <NavLink onClick={() => scrollToSection('vida')}>Vida en la granja</NavLink>
          <NavLink onClick={() => scrollToSection('productos')}>Productos</NavLink>
          <NavLink onClick={() => scrollToSection('galeria')}>Galería</NavLink>
          <NavLink onClick={() => scrollToSection('contacto')}>Contacto</NavLink>
        </div>
        <button
          onClick={() => scrollToSection('contacto')}
          className="btn-primary text-sm"
        >
          Contáctanos
        </button>
      </div>
    </nav>
  );
}

function NavLink({ onClick, children }: { onClick: () => void; children: string }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-app-primary transition"
    >
      {children}
    </button>
  );
}
