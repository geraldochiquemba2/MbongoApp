import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
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
              className="bg-white text-primary hover:bg-white/90 border-white/20 border"
              data-testid="button-hero-comecar"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Começar Agora
            </Button>
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

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl">
            <div>
              <div className="text-3xl font-bold font-heading">5+</div>
              <div className="text-sm text-white/80">Guias Práticos</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-heading">15+</div>
              <div className="text-sm text-white/80">Empresas BODIVA</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-heading">100%</div>
              <div className="text-sm text-white/80">Gratuito</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
