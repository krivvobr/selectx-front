import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { SlidersHorizontal } from "lucide-react";
import { listProperties, listCities, type PropertyPurpose } from "@/services/properties";

const Properties = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 5000000]);

  const [searchParams, setSearchParams] = useSearchParams();

  const tipoParam = searchParams.get("tipo");
  const finalidadeParam = searchParams.get("finalidade");
  const cidadeParam = searchParams.get("cidade");

  let typeFilter: string | undefined;
  let purposeFilter: PropertyPurpose | undefined;

  if (finalidadeParam === "venda" || finalidadeParam === "locacao") {
    purposeFilter = finalidadeParam as PropertyPurpose;
  }

  if (tipoParam) {
    if (tipoParam === "venda" || tipoParam === "locacao") {
      purposeFilter = tipoParam as PropertyPurpose;
    } else {
      typeFilter = tipoParam;
    }
  }

  const cityIdFilter = cidadeParam ? Number(cidadeParam) : undefined;

  // Local UI state for controlled filters, initialized from URL params
  const [selectedType, setSelectedType] = useState<string | undefined>(typeFilter);
  const [selectedPurpose, setSelectedPurpose] = useState<PropertyPurpose | undefined>(purposeFilter);
  const [selectedCityId, setSelectedCityId] = useState<number | undefined>(cityIdFilter);

  // Load cities for location filter
  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: listCities,
  });

  const { data: properties, isLoading, isError, error } = useQuery({
    queryKey: [
      "properties",
      { priceRange, typeFilter, purposeFilter, cityIdFilter },
    ],
    queryFn: () =>
      listProperties({
        type: typeFilter,
        purpose: purposeFilter,
        cityId: cityIdFilter,
      }),
  });

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (selectedType) params.set("tipo", selectedType);
    if (selectedPurpose) params.set("finalidade", selectedPurpose);
    if (typeof selectedCityId === "number") params.set("cidade", String(selectedCityId));
    setSearchParams(params);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Encontre seu Imóvel Ideal
            </h1>
            <p className="text-muted-foreground">
              {(properties?.length ?? 0)} imóveis encontrados
            </p>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <aside className="w-80 shrink-0 hidden lg:block">
                <div className="bg-gradient-card border border-border p-6 sticky top-28 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
                    <Button variant="ghost" size="sm">
                      Limpar
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Tipo de Imóvel
                      </label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartamento">Apartamento</SelectItem>
                          <SelectItem value="casa">Casa</SelectItem>
                          <SelectItem value="cobertura">Cobertura</SelectItem>
                          <SelectItem value="terreno">Terreno</SelectItem>
                          <SelectItem value="comercial">Comercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Finalidade
                      </label>
                      <Select value={selectedPurpose} onValueChange={(val) => setSelectedPurpose(val as PropertyPurpose)}>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Venda ou Locação" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="venda">Venda</SelectItem>
                          <SelectItem value="locacao">Locação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Cidade
                      </label>
                      <Select value={selectedCityId !== undefined ? String(selectedCityId) : undefined} onValueChange={(val) => setSelectedCityId(Number(val))}>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                          {(cities ?? []).map((city) => (
                            <SelectItem key={city.id} value={String(city.id)}>{city.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-4 block">
                        Faixa de Preço
                      </label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={5000000}
                        step={50000}
                        className="mb-4"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{formatCurrency(priceRange[0])}</span>
                        <span>{formatCurrency(priceRange[1])}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Quartos
                      </label>
                      <Select>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Qualquer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="qualquer">Qualquer</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Vagas de Garagem
                      </label>
                      <Select>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Qualquer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="qualquer">Qualquer</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Área Útil (m²)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="number"
                          placeholder="Mín"
                          className="bg-background border-border"
                        />
                        <Input
                          type="number"
                          placeholder="Máx"
                          className="bg-background border-border"
                        />
                      </div>
                    </div>

                    <Button variant="luxury" className="w-full" onClick={applyFilters}>
                      Aplicar Filtros
                    </Button>
                  </div>
                </div>
              </aside>
            )}

            {/* Properties Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                </Button>

                <Select defaultValue="recent">
                  <SelectTrigger className="w-48 bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Mais Recentes</SelectItem>
                    <SelectItem value="price-asc">Menor Preço</SelectItem>
                    <SelectItem value="price-desc">Maior Preço</SelectItem>
                    <SelectItem value="area-desc">Maior Área</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isLoading && (
                <div className="text-center text-muted-foreground py-8">
                  Carregando imóveis...
                </div>
              )}

              {isError && (
                <div className="text-center text-red-500 py-8">
                  Erro ao buscar imóveis: {String((error as any)?.message ?? "")}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {(properties ?? []).map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center gap-2">
                <Button variant="outline">Anterior</Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Próximo</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Properties;
