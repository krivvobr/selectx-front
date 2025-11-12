import { useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Bed, 
  Car, 
  Maximize, 
  MapPin, 
  Phone, 
  Mail, 
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Home,
  CheckCircle2,
  MessageCircle
} from "lucide-react";
import { getPropertyById } from "@/services/properties";
import { createLead } from "@/services/leads";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const PropertyDetail = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams();
  const { data: property, isLoading, isError, error } = useQuery({
    queryKey: ["property-detail", { id }],
    queryFn: () => getPropertyById(id!),
    enabled: Boolean(id),
  });
  const images = (property?.images && property.images.length > 0)
    ? property.images
    : (property?.image ? [property.image] : ["/placeholder.svg"]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      toast({
        title: "Contato enviado com sucesso!",
        description: "Entraremos em contato em breve.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao enviar contato.",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name,
      email,
      phone,
      message,
      property_url: window.location.href,
    });
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(property?.price ?? 0);

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {isLoading && (
            <div className="text-center text-muted-foreground py-8">Carregando imóvel...</div>
          )}
          {isError && (
            <div className="text-center text-red-500 py-8">Erro ao carregar imóvel: {String((error as any)?.message ?? "")}</div>
          )}
          {!property && !isLoading && !isError && (
            <div className="text-center text-muted-foreground py-8">Imóvel não encontrado.</div>
          )}
          {property && (
          <>
          {/* Gallery */}
          <div className="mb-8">
            <div className="relative aspect-video overflow-hidden mb-4 shadow-luxury">
              <img
                src={images[currentImage]}
                alt={`Imagem ${currentImage + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`h-2 transition-all ${
                      index === currentImage ? "w-8 bg-primary" : "w-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="secondary" size="icon" className="bg-black/50 backdrop-blur-sm hover:bg-black/70">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="secondary" size="icon" className="bg-black/50 backdrop-blur-sm hover:bg-black/70">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`aspect-video overflow-hidden border-2 transition-all ${
                    index === currentImage
                      ? "border-primary shadow-gold"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-gradient-gold text-primary-foreground px-4 py-1.5 text-sm font-semibold uppercase shadow-gold">
                    {property.purpose === "venda" ? "Venda" : "Locação"}
                  </span>
                  {property.code && (
                    <span className="text-muted-foreground">Código: {property.code}</span>
                  )}
                </div>

                <h1 className="text-4xl font-bold text-foreground mb-4">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{property.location}</span>
                </div>

                <div className="text-4xl font-bold text-primary mb-2">
                  {formattedPrice}
                </div>
              </div>

              {/* Specifications */}
              <Card className="bg-gradient-card border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Especificações
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3">
                      <Bed className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Quartos</p>
                      <p className="font-semibold text-foreground">{property.bedrooms}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3">
                      <Home className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Suítes</p>
                      <p className="font-semibold text-foreground">{property.suites ?? 0}</p>
                  </div>
                </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3">
                      <Car className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Vagas</p>
                      <p className="font-semibold text-foreground">{property.parking}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3">
                      <Maximize className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Área em m²</p>
                      <p className="font-semibold text-foreground">{property.area}m²</p>
                    </div>
                  </div>

                  {/* <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3">
                      <Maximize className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Área Total</p>
                      <p className="font-semibold text-foreground">{property.totalArea ?? 0}m²</p>
                  </div>
                </div> */}
{/* 
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3">
                      <Home className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Andar</p>
                      <p className="font-semibold text-foreground">{property.floor ?? 0}º</p>
                  </div>
                </div> */}
              </div>

                <div className="mt-6 pt-6 border-t border-border flex gap-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm text-foreground">
                      {property.furnished ? "Mobiliado" : "Não Mobiliado"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm text-foreground">
                      {property.financing ? "Aceita Financiamento" : "Não Aceita Financiamento"}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Description */}
              <Card className="bg-gradient-card border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Descrição
                </h2>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {property.description ?? ""}
                </p>
              </Card>

              {/* Amenities */}
              {/* <Card className="bg-gradient-card border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Comodidades
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(property.amenities ?? []).map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </Card> */}

              {/* Map */}
              {/* <Card className="bg-gradient-card border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Localização
                </h2>
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Mapa integrado aqui</p>
                </div>
              </Card> */}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Form */}
              <Card className="bg-gradient-card border-border p-6 sticky top-28">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Entre em Contato
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <Input
                    placeholder="Seu nome"
                    className="bg-background border-border"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="Seu e-mail"
                    className="bg-background border-border"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="tel"
                    placeholder="Seu telefone"
                    className="bg-background border-border"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <Textarea
                    placeholder="Mensagem (opcional)"
                    className="bg-background border-border min-h-24"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <input type="hidden" name="property_url" value={window.location.href} />
                  <Button variant="luxury" className="w-full" size="lg" type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Enviando..." : "Agendar Visita"}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-border space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Precisa de ajuda?</p>
                      <a href="tel:+554832633090" className="text-sm font-medium text-foreground hover:text-primary">
                        (48) 3263-3090
                      </a>
                    </div>
                  </div>

                  <Button variant="luxury" className="w-full" asChild>
                    <a href="https://wa.me/554832633090" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      Chame no WhatsApp
                    </a>
                  </Button>

                  <Button variant="outline" className="w-full" asChild>
                    <a href="mailto:contato@selectximobiliarias.com.br">
                      <Mail className="h-4 w-4" />
                      Enviar E-mail
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
          </>
          )}
        </div>
      </div>

      <Footer />
      <Toaster />
    </div>
  );
};

export default PropertyDetail;
