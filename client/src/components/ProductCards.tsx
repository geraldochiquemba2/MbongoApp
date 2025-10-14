import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

//todo: remove mock functionality
const stocks = [
  { name: "Banco BAI", ticker: "BAI", price: 1850, change: 2.5, sector: "Financeiro" },
  { name: "Unitel", ticker: "UNT", price: 3200, change: -1.2, sector: "Telecomunicações" },
  { name: "ENSA", ticker: "ENSA", price: 890, change: 0.8, sector: "Energia" },
  { name: "Galp Angola", ticker: "GALP", price: 1450, change: 1.9, sector: "Petróleo & Gás" },
];

const bonds = [
  { name: "BT 91 dias", rate: 6.5, min: 100000, type: "Bilhete do Tesouro" },
  { name: "BT 182 dias", rate: 7.2, min: 100000, type: "Bilhete do Tesouro" },
  { name: "OT 2 anos", rate: 9.5, min: 500000, type: "Obrigação do Tesouro" },
  { name: "OT 5 anos", rate: 12.0, min: 500000, type: "Obrigação do Tesouro" },
];

export default function ProductCards() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <iframe
          className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/8ljGmIakBWM?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&autohide=1&modestbranding=1&vq=hd1080&playlist=8ljGmIakBWM&playsinline=1&disablekb=1&fs=0&rel=0"
          title="Background video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/50 to-background/40"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Produtos Disponíveis no Mercado
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Informação atualizada sobre ações e títulos do tesouro
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Stocks */}
          <div>
            <h3 className="font-heading text-2xl font-semibold mb-4">Ações da BODIVA</h3>
            <div className="space-y-3">
              {stocks.map((stock, index) => (
                <Card 
                  key={index} 
                  className="hover-elevate transition-all duration-200"
                  data-testid={`card-stock-${index}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{stock.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {stock.ticker}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{stock.sector}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold font-heading" data-testid={`text-stock-price-${index}`}>
                          {stock.price.toLocaleString()} AOA
                        </p>
                        <div className={`flex items-center justify-end gap-1 text-sm font-medium ${
                          stock.change >= 0 ? 'text-chart-2' : 'text-chart-4'
                        }`}>
                          {stock.change >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          <span>{stock.change >= 0 ? '+' : ''}{stock.change}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Bonds */}
          <div>
            <h3 className="font-heading text-2xl font-semibold mb-4">Títulos do Tesouro</h3>
            <div className="space-y-3">
              {bonds.map((bond, index) => (
                <Card 
                  key={index} 
                  className="hover-elevate transition-all duration-200"
                  data-testid={`card-bond-${index}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{bond.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{bond.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold font-heading text-chart-2" data-testid={`text-bond-rate-${index}`}>
                          {bond.rate}% a.a.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Mín. {(bond.min / 1000).toLocaleString()}K AOA
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
