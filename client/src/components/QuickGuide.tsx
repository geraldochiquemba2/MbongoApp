import { Card, CardContent } from "@/components/ui/card";
import { UserCheck, Search, Calculator, FileText, TrendingUp } from "lucide-react";
import backgroundImage from "@assets/Gemini_Generated_Image_q9lsxaq9lsxaq9ls_1760448018416.png";

const steps = [
  {
    icon: UserCheck,
    number: "1",
    title: "Faça o Teste de Risco",
    description: "Descubra que tipo de investidor você é e quais produtos combinam consigo"
  },
  {
    icon: Search,
    number: "2",
    title: "Explore os Produtos",
    description: "Conheça Ações, Títulos do Tesouro e Fundos disponíveis na BODIVA"
  },
  {
    icon: Calculator,
    number: "3",
    title: "Simule os seus Objetivos",
    description: "Use as calculadoras para planear quanto precisa investir mensalmente"
  },
  {
    icon: FileText,
    number: "4",
    title: "Escolha um Intermediário",
    description: "Selecione um banco ou corretora autorizada para abrir conta"
  },
  {
    icon: TrendingUp,
    number: "5",
    title: "Comece a Investir",
    description: "Faça o seu primeiro investimento e acompanhe os resultados"
  }
];

export default function QuickGuide() {
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
            Guia Rápido de 5 Passos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comece a investir na BODIVA seguindo estes passos simples
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index} 
                className="relative hover-elevate transition-all duration-300 bg-transparent backdrop-blur-sm border-2 border-white/30"
                data-testid={`card-step-${index}`}
              >
                <CardContent className="p-6 text-center flex flex-col items-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                  <div className="mt-4 mb-4 flex items-center justify-center p-2 bg-primary/10 rounded-xl">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold mb-2 text-base text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
