import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const stocks = [
  { name: "Banco de Fomento Angola", ticker: "BFA", price: 61875, change: 12.5, sector: "Financeiro" },
  { name: "ENSA", ticker: "ENSA", price: 4500, change: 1.8, sector: "Energia" },
  { name: "ACREP", ticker: "ACREP", price: 2850, change: -0.5, sector: "Seguros" },
  { name: "BODIVA", ticker: "BODIVA", price: 3200, change: 2.3, sector: "Mercados Financeiros" },
];

const bonds = [
  { name: "BT 91 dias", rate: 16.5, min: 100000, type: "Bilhete do Tesouro" },
  { name: "BT 182 dias", rate: 17.0, min: 100000, type: "Bilhete do Tesouro" },
  { name: "BT 364 dias", rate: 17.5, min: 100000, type: "Bilhete do Tesouro" },
  { name: "OT 2 anos", rate: 19.0, min: 500000, type: "Obrigação do Tesouro" },
  { name: "OT 5 anos", rate: 21.5, min: 1000000, type: "Obrigação do Tesouro" },
];

export default function ProductCards() {
  return (
    <section id="produtos" className="relative">
      {/* Video Background - Fixed */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100%] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/8ljGmIakBWM?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&autohide=1&modestbranding=1&vq=hd1080&playlist=8ljGmIakBWM&playsinline=1&disablekb=1&fs=0&rel=0"
            title="Background video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            style={{ pointerEvents: 'none' }}
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/50 to-background/40"></div>
      </div>
      
      {/* Content that scrolls over the video */}
      <div className="relative -mt-[100vh] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Produtos Disponíveis no Mercado
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Informação baseada em dados reais do mercado angolano (2025)
            </p>
          </div>

          <Alert className="mb-8 max-w-4xl mx-auto bg-card/50 backdrop-blur-sm" data-testid="alert-data-disclaimer">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Dados de Referência:</strong> As informações apresentadas são baseadas em dados reais das empresas listadas na BODIVA e taxas do Banco Nacional de Angola (2025). Os valores são ilustrativos e podem variar. Para investimentos reais, consulte sempre uma instituição financeira autorizada.
            </AlertDescription>
          </Alert>

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
      </div>
    </section>
  );
}
