export function Navigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-oat-border bg-oat-base">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <button
          onClick={() => scrollToSection('hero')}
          className="font-serif text-xl text-soil hover:opacity-70 transition-opacity duration-150"
        >
          Granja Villa Alegre
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
      className="px-3 py-2 text-sm font-medium text-soil-secondary hover:text-soil hover:underline decoration-terracotta underline-offset-4 transition-colors duration-150"
    >
      {children}
    </button>
  );
}
