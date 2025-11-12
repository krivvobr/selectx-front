import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Slide = {
  src: string;
  alt?: string;
};

interface HeroSliderProps {
  slides: Slide[];
  intervalMs?: number;
  bottomContent?: React.ReactNode;
  className?: string;
}

const HeroSlider = ({ slides, intervalMs = 6000, bottomContent, className }: HeroSliderProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [slides.length, intervalMs]);

  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section className={`relative h-[600px] flex items-center justify-center overflow-hidden ${className ?? ""}`}> 
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute h-auto mt-14 inset-0 transition-opacity duration-700 ease-out ${idx === current ? "opacity-100" : "opacity-0"}`}
        >
          <img src={slide.src} alt={slide.alt ?? `slide-${idx}`} className="w-full h-full object-contain" />
        </div>
      ))}
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background/80" />

      {/* Controls */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-10">
        <Button variant="ghost" size="icon" aria-label="Anterior" onClick={goPrev} className="bg-background/40 hover:bg-background/60 border border-border">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Próximo" onClick={goNext} className="bg-background/40 hover:bg-background/60 border border-border">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={`dot-${idx}`}
            aria-label={`Ir para slide ${idx + 1}`}
            onClick={() => setCurrent(idx)}
            className={`h-2.5 w-2.5 rounded-full border border-border transition-colors ${idx === current ? "bg-primary" : "bg-background/60 hover:bg-background"}`}
          />
        ))}
      </div>

      {/* Bottom anchored content (search section) */}
      {bottomContent ? (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-10">
          {bottomContent}
        </div>
      ) : null}
    </section>
  );
};

export default HeroSlider;