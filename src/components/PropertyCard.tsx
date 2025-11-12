import { Bed, Car, Maximize, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  type: string;
  location: string;
  price: number;
  purpose: "venda" | "locacao";
  bedrooms: number;
  parking: number;
  area: number;
}

const PropertyCard = ({
  id,
  image,
  title,
  type,
  location,
  price,
  purpose,
  bedrooms,
  parking,
  area,
}: PropertyCardProps) => {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  return (
    <div className="group bg-gradient-card overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-luxury">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-gold text-primary-foreground px-3 py-1 text-xs font-semibold uppercase shadow-gold">
            {purpose === "venda" ? "Venda" : "Locação"}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-secondary/90 backdrop-blur-sm text-secondary-foreground px-3 py-1 text-xs font-medium">
            {type}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1 capitalize">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4 text-primary" />
            <span className="text-sm">{bedrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-primary" />
            <span className="text-sm">{parking}</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize className="h-4 w-4 text-primary" />
            <span className="text-sm">{area}m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {purpose === "venda" ? "Valor" : "Mensal"}
            </p>
            <p className="text-xl font-bold text-primary">{formattedPrice}</p>
          </div>
          <Link to={`/imovel/${id}`}>
            <Button variant="outline" size="sm">
              Ver Detalhes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
