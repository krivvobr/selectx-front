import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/selectx-logo.svg" alt="SelectX Imobiliarias" className="h-8 md:h-10 w-auto" />
            </div>
            <p className="text-muted-foreground text-sm">
              Encontre o imóvel dos seus sonhos com profissionalismo e dedicação.
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              CRECI: 6268J
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/imoveis" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Comprar
                </Link>
              </li>
              <li>
                <Link to="/imoveis?tipo=locacao" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Alugar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary" />
                (48) 3263-3090
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary" />
                contato@selectximobiliarias.com.br
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>Rua Coronel Buchelle, 180 - Centro, Tijucas - SC</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Redes Sociais</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-secondary p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-secondary p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 SelectX Imobiliarias. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/politica-privacidade" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
