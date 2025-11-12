import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import PropertyCard from "@/components/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { listProperties, listCities } from "@/services/properties";
import { Search, Award, Users, Shield, TrendingUp } from "lucide-react";
import heroImage from "@/assets/slider/sl2.png";
import property1 from "@/assets/slider/sl3.png";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import HeroSlider from "@/components/HeroSlider";
import { Link } from "react-router-dom";

const Index = () => {
  const { data: featuredProperties, isLoading, isError, error } = useQuery({
    queryKey: ["home-featured"],
    queryFn: () => listProperties(),
  });

  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: listCities,
  });

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      {/* Hero Slider with bottom-anchored search */}
      <HeroSlider
        slides={[
          { src: heroImage, alt: "Ambiente de luxo" },
          { src: property1, alt: "Apartamento moderno" },

        ]}
        bottomContent={
          <div className="bg-gradient-card border border-border p-6 shadow-luxury relative top-4 z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Tipo */}
              <Select>
                <SelectTrigger className="bg-background border-border" aria-label="Tipo de imóvel">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartamento">Apartamento</SelectItem>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="cobertura">Cobertura</SelectItem>
                  <SelectItem value="terreno">Terreno</SelectItem>
                </SelectContent>
              </Select>

              {/* Aluguel ou Venda */}
              <Select>
                <SelectTrigger className="bg-background border-border" aria-label="Aluguel ou Venda">
                  <SelectValue placeholder="Aluguel ou Venda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="venda">Venda</SelectItem>
                  <SelectItem value="locacao">Aluguel</SelectItem>
                </SelectContent>
              </Select>

              {/* Cidades */}
              <Select>
                <SelectTrigger className="bg-background border-border" aria-label="Cidades">
                  <SelectValue placeholder="Cidades" />
                </SelectTrigger>
                <SelectContent>
                  {(cities ?? []).map((city) => (
                    <SelectItem key={city.id} value={city.name}>{city.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Buscar */}
              <Button variant="luxury" size="default" className="w-full">
                <Search className="h-4 w-4" />
                Buscar
              </Button>
            </div>
          </div>
        }
      />

      {/* Featured Properties */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Imóveis em Destaque
            </h2>
            <p className="text-muted-foreground text-lg">
              Seleção exclusiva dos melhores imóveis do momento
            </p>
          </div>

          {isLoading && (
            <div className="text-center text-muted-foreground py-8">
              Carregando imóveis em destaque...
            </div>
          )}
          {isError && (
            <div className="text-center text-red-500 py-8">
              Erro ao carregar imóveis: {String((error as any)?.message ?? "")}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(featuredProperties ?? []).slice(0, 6).map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/imoveis" className="text-primary underline-offset-4 hover:underline border border-gray-500 p-4 px-4 ">
              Ver Todos os Imóveis
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Por que Escolher a SelectX?
            </h2>
            <p className="text-muted-foreground text-lg">
              Diferenciais que nos tornam únicos no mercado imobiliário
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 p-6 bg-background/50 border border-border hover:border-primary/50 transition-all duration-300">
              <div className="bg-gradient-gold p-4 w-fit mx-auto shadow-gold">
                <Award className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Experiência</h3>
              <p className="text-muted-foreground">
                Mais de 15 anos atuando no mercado imobiliário
              </p>
            </div>

            <div className="text-center space-y-4 p-6 bg-background/50 border border-border hover:border-primary/50 transition-all duration-300">
              <div className="bg-gradient-gold p-4 w-fit mx-auto shadow-gold">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Atendimento</h3>
              <p className="text-muted-foreground">
                Corretores especializados e dedicados ao seu sucesso
              </p>
            </div>

            <div className="text-center space-y-4 p-6 bg-background/50 border border-border hover:border-primary/50 transition-all duration-300">
              <div className="bg-gradient-gold p-4 w-fit mx-auto shadow-gold">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Segurança</h3>
              <p className="text-muted-foreground">
                Transparência total em todas as negociações
              </p>
            </div>

            <div className="text-center space-y-4 p-6 bg-background/50 border border-border hover:border-primary/50 transition-all duration-300">
              <div className="bg-gradient-gold p-4 w-fit mx-auto shadow-gold">
                <TrendingUp className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Resultados</h3>
              <p className="text-muted-foreground">
                Milhares de clientes satisfeitos e negócios fechados
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
