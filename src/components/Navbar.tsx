import { Menu, X, Shield, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-6 py-2 text-xs md:text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>CRECI: 6268J</span>
            </div>
            <a href="mailto:contato@selectximobiliarias.com.br" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">contato@selectximobiliarias.com.br</span>
            </a>
            <a href="tel:+554832633090" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              <span>Precisa de ajuda? (48) 3263-3090</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="SelectX Imobiliarias" className="h-10 md:h-10 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/imoveis" className="text-foreground hover:text-primary transition-colors">
              Comprar
            </Link>
            <Link to="/imoveis?tipo=locacao" className="text-foreground hover:text-primary transition-colors">
              Alugar
            </Link>
            <Link to="/imoveis?destaque=lancamentos" className="text-foreground hover:text-primary transition-colors">
              Lançamentos
            </Link>
            <Link to="/leads" className="text-foreground hover:text-primary transition-colors">
              Leads
            </Link>
            <a href="tel:+554832633090" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              (48) 3263-3090
            </a>
            <Button variant="luxury" size="sm" asChild>
              <a href="https://wa.me/554832633090" target="_blank" rel="noopener noreferrer">
                Chame no WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link
              to="/"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/imoveis"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Comprar
            </Link>
            <Link
              to="/imoveis?tipo=locacao"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Alugar
            </Link>
            <Link
              to="/imoveis?destaque=lancamentos"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Lançamentos
            </Link>
            <Link
              to="/leads"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Leads
            </Link>
            <a href="tel:+554832633090" className="block text-foreground hover:text-primary transition-colors">
              (48) 3263-3090
            </a>
            <Button variant="luxury" size="sm" className="w-full" asChild>
              <a href="https://wa.me/554832633090" target="_blank" rel="noopener noreferrer">
                Chame no WhatsApp
              </a>
            </Button>
          </div>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
