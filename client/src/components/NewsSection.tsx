import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, Bell, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import financeImage1 from "@assets/stock_images/financial_market_tra_c625e054.jpg";
import financeImage2 from "@assets/stock_images/financial_market_tra_22cc0dc1.jpg";
import financeImage3 from "@assets/stock_images/financial_market_tra_ba4bf22a.jpg";
import financeImage4 from "@assets/stock_images/financial_market_tra_8995ce36.jpg";
import financeImage5 from "@assets/stock_images/financial_market_tra_eaed88e1.jpg";

const financeImages = [
  financeImage1,
  financeImage2,
  financeImage3,
  financeImage4,
  financeImage5
];

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % financeImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Image Carousel Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {financeImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Finance background ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
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
              <Link href="/noticias" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
