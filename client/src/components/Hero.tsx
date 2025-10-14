import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative text-white overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/Yx3FImS60Wc?autoplay=1&mute=1&loop=1&playlist=Yx3FImS60Wc&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
          allow="autoplay; encrypted-media"
          title="Background video"
          style={{ pointerEvents: 'none' }}
        />
      </div>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Informação oficial BODIVA & CMC</span>
          </div>
          
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Investe sem medo no mercado angolano
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Aprenda a investir na BODIVA com guias simples, calculadoras inteligentes e informação atualizada sobre Títulos do Tesouro, Ações e Fundos.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
              data-testid="button-hero-produtos"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Ver Produtos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
