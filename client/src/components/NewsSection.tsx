import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, Bell, TrendingUp } from "lucide-react";
import { Link } from "wouter";

//todo: remove mock functionality
const news = [
  {
    title: "BNA mantém taxa de juro de referência em 19%",
    source: "Banco Nacional de Angola",
    date: "2 dias atrás",
    category: "Política Monetária",
    important: true
  },
  {
    title: "CMC aprova novo regulamento para IPOs",
    source: "Comissão do Mercado de Capitais",
    date: "5 dias atrás",
    category: "Regulação",
    important: true
  },
  {
    title: "BODIVA regista crescimento de 15% no volume de negócios",
    source: "BODIVA",
    date: "1 semana atrás",
    category: "Mercado",
    important: false
  }
];

//todo: remove mock functionality
const ipoAlert = {
  company: "Angola Telecom",
  openDate: "15 de Novembro",
  minInvestment: "250.000 AOA",
  expectedReturn: "8-12% a.a."
};

export default function NewsSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100%] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/0cauohxCTAY?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&autohide=1&modestbranding=1&vq=hd1080&playlist=0cauohxCTAY&playsinline=1&disablekb=1&fs=0&rel=0"
          title="Background video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          style={{ pointerEvents: 'none' }}
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/50 to-background/40"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Notícias e Avisos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mantenha-se informado sobre o mercado angolano
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* IPO Alert */}
          <div className="lg:col-span-1">
            <Card className="border-chart-3 bg-chart-3/5">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="h-5 w-5 text-chart-3" />
                  <CardTitle className="font-heading text-xl">Próximo IPO</CardTitle>
                </div>
                <CardDescription>Não perca esta oportunidade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-3" data-testid="text-ipo-company">
                    {ipoAlert.company}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Abertura:</span>
                      <span className="font-semibold">{ipoAlert.openDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Investimento mínimo:</span>
                      <span className="font-semibold">{ipoAlert.minInvestment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Retorno esperado:</span>
                      <span className="font-semibold text-chart-2">{ipoAlert.expectedReturn}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full" variant="default" data-testid="button-ipo-alert">
                  Receber Alerta
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* News List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {news.map((item, index) => (
                <Card 
                  key={index} 
                  className="hover-elevate transition-all duration-200"
                  data-testid={`card-news-${index}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Newspaper className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-semibold leading-tight">
                            {item.title}
                          </h3>
                          {item.important && (
                            <Badge variant="secondary" className="shrink-0">
                              Importante
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{item.source}</span>
                          <span>•</span>
                          <span>{item.date}</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/noticias">
                <Button variant="outline" data-testid="button-more-news">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Ver Todas as Notícias
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
