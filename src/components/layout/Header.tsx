import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Logo</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          {/* Adicione links de navegação aqui */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
