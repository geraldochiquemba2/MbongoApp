import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, TrendingUp, Calculator, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Como o Mbongo pode ajudá-lo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tudo o que precisa para começar a investir com confiança no mercado angolano
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="hover-elevate transition-all duration-300 border-card-border"
                data-testid={`card-feature-${index}`}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
