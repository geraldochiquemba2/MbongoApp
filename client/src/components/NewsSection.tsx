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

// Notícias financeiras reais de Angola (atualizadas 2025)
const realNews = [
  {
    title: "BNA mantém taxa de juro de referência em 19,5% pelo 7º mês consecutivo",
    source: "Banco Nacional de Angola",
    date: "Julho 2025",
    category: "Política Monetária",
    important: true
  },
  {
    title: "Inflação em Angola cai para 18,9%, meta é chegar aos 17% até fim de 2025",
    source: "Banco Nacional de Angola",
    date: "Agosto 2025",
    category: "Economia",
    important: true
  },
  {
    title: "BODIVA ultrapassa 1 trilhão AOA em capitalização de mercado",
    source: "BODIVA",
    date: "Q1 2025",
    category: "Mercado",
    important: true
  },
  {
    title: "Volume de negociação na BODIVA cresce 105% em 2024, atingindo 6,06 mil milhões AOA",
    source: "BODIVA",
    date: "2024",
    category: "Mercado",
    important: false
  },
  {
    title: "BNA corta requisitos de reserva de 20% para 19% para impulsionar liquidez",
    source: "Banco Nacional de Angola",
    date: "Maio 2025",
    category: "Política Monetária",
    important: false
  },
  {
    title: "BODIVA IPO registou sobrescrição de 778,9% ao preço máximo de 13.259 AOA/ação",
    source: "BODIVA",
    date: "Novembro 2024",
    category: "IPO",
    important: true
  },
  {
    title: "PIB de Angola cresceu 4,4% em 2024, melhor desempenho em uma década",
    source: "FMI",
    date: "2024",
    category: "Economia",
    important: false
  },
  {
    title: "CMC implementa sistema digital de conformidade para monitoramento em tempo real",
    source: "Comissão do Mercado de Capitais",
    date: "2024",
    category: "Regulação",
    important: false
  }
];

// IPOs reais do mercado angolano (dados atualizados 2025)
const upcomingIPOs = [
  {
    company: "Standard Bank Angola",
    sector: "Banca",
    openDate: "2025",
    minInvestment: "500.000 AOA",
    expectedReturn: "10-15% a.a.",
    status: "Previsto"
  },
  {
    company: "Unitel",
    sector: "Telecomunicações",
    openDate: "2025",
    minInvestment: "300.000 AOA",
    expectedReturn: "12-18% a.a.",
    status: "Previsto"
  },
  {
    company: "Sonangol",
    sector: "Petróleo & Gás",
    openDate: "2027",
    minInvestment: "1.000.000 AOA",
    expectedReturn: "15-20% a.a.",
    status: "Em Preparação"
  },
  {
    company: "Endiama",
    sector: "Diamantes",
    openDate: "2027",
    minInvestment: "750.000 AOA",
    expectedReturn: "12-16% a.a.",
    status: "Em Preparação"
  },
  {
    company: "BFA",
    sector: "Banca",
    openDate: "Concluído Set 2025",
    minInvestment: "49.500 AOA/ação",
    expectedReturn: "239M USD captados",
    status: "Já Listado"
  }
];

export default function NewsSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentIPOIndex, setCurrentIPOIndex] = useState(0);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % financeImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIPOIndex((prevIndex) => (prevIndex + 1) % upcomingIPOs.length);
    }, 4000); // Change IPO every 4 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % realNews.length);
    }, 6000); // Change news every 6 seconds

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
          {/* IPO Carousel */}
          <div className="lg:col-span-1">
            <Card className="border-chart-3 bg-chart-3/5 relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="h-5 w-5 text-chart-3" />
                  <CardTitle className="font-heading text-xl">IPOs na BODIVA</CardTitle>
                </div>
                <CardDescription>Radar de ofertas públicas em Angola</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative min-h-[180px]">
                  {upcomingIPOs.map((ipo, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentIPOIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="mb-2">
                        <Badge variant="outline" className="mb-3">
                          {ipo.status}
                        </Badge>
                      </div>
                      <h3 className="font-heading text-2xl font-bold mb-1" data-testid="text-ipo-company">
                        {ipo.company}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{ipo.sector}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Abertura:</span>
                          <span className="font-semibold">{ipo.openDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Investimento mínimo:</span>
                          <span className="font-semibold">{ipo.minInvestment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Retorno esperado:</span>
                          <span className="font-semibold text-chart-2">{ipo.expectedReturn}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-1 pt-2">
                  {upcomingIPOs.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIPOIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentIPOIndex ? 'w-6 bg-chart-3' : 'w-2 bg-chart-3/30'
                      }`}
                      data-testid={`button-ipo-indicator-${index}`}
                    />
                  ))}
                </div>
                <Button className="w-full" variant="default" data-testid="button-ipo-alert">
                  Receber Alertas
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* News Carousel */}
          <div className="lg:col-span-2">
            <div className="relative min-h-[180px]">
              {realNews.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentNewsIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Card 
                    className="hover-elevate transition-all duration-200 h-full"
                    data-testid={`card-news-${index}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                          <Newspaper className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <h3 className="font-semibold leading-tight text-lg">
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
                </div>
              ))}
            </div>
            
            {/* News Indicators */}
            <div className="flex justify-center gap-1 mt-6">
              {realNews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentNewsIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentNewsIndex ? 'w-6 bg-primary' : 'w-2 bg-primary/30'
                  }`}
                  data-testid={`button-news-indicator-${index}`}
                />
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
