import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-card border-t border-border shadow-luxury animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Cookie className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">Cookies e Privacidade</h3>
            <p className="text-sm text-muted-foreground">
              Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
              <a href="/politica-privacidade" className="text-primary hover:underline">
                Política de Privacidade
              </a>
              .
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={handleReject}>
            Rejeitar
          </Button>
          <Button variant="luxury" size="sm" onClick={handleAccept}>
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
