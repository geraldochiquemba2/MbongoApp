import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, TrendingUp, Calculator, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import backgroundImage from "@assets/Gemini_Generated_Image_y6zw1hy6zw1hy6zw_1760443671783.png";

const features = [
  {
    icon: GraduationCap,
    title: "Aprender Fácil e Rápido",
    description: "Guia de 5 passos, explicações sobre Ações, Títulos e Fundos, e teste de perfil de risco personalizado.",
    action: "Começar a Aprender",
    href: "/aprender",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10"
  },
  {
    icon: TrendingUp,
    title: "Ver os Produtos Disponíveis",
    description: "Títulos do Tesouro, Ações da BODIVA, páginas de empresas e radar de IPOs com informação atualizada.",
    action: "Ver Produtos",
    href: "/produtos",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10"
  },
  {
    icon: Calculator,
    title: "Simular e Planear Metas",
    description: "Calculadora de poupança, simulador de inflação e gráficos de crescimento para atingir os seus objetivos.",
    action: "Fazer Simulação",
    href: "/simular",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10"
  },
  {
    icon: Link2,
    title: "Conectar e Comprar",
    description: "Lista de bancos e corretoras autorizadas, cotações do dia e conexão direta com intermediários.",
    action: "Ver Intermediários",
    href: "/conectar",
    color: "text-primary",
    bgColor: "bg-primary/10"
  }
];

export default function FeatureCards() {
  return (
    <section 
      className="py-16 md:py-24 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/25 to-background/30"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Como o Mbongo pode ajudá-lo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tudo o que precisa para começar a investir com confiança no mercado angolano
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="relative" style={{ paddingBottom: '40px' }}>
                <Card 
                  className="hover-elevate transition-all duration-300 border-card-border relative bg-transparent backdrop-blur-sm"
                  data-testid={`card-feature-${index}`}
                  style={{
                    WebkitBoxReflect: 'below 2px linear-gradient(transparent, transparent 40%, rgba(0, 0, 0, 0.3))'
                  }}
                >
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
                  <div className={`p-3 rounded-xl ${feature.bgColor}`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-heading">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <Button 
                    variant="ghost" 
                    className="text-primary hover:text-primary p-0 h-auto font-medium"
                    data-testid={`button-feature-${index}`}
                  >
                    {feature.action} →
                  </Button>
                </CardContent>
              </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
