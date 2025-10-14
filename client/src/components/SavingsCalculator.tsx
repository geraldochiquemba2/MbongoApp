import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, CheckCircle2, AlertCircle, Building2 } from "lucide-react";

const bankRecommendations = [
  {
    name: "Banco BAI",
    type: "Banco Comercial",
    minInvestment: 50000,
    riskLevel: "Baixo",
    advantages: [
      "Maior banco de Angola",
      "Plataforma digital moderna",
      "Ampla rede de agências",
      "Atendimento especializado"
    ],
    disadvantages: [
      "Taxa de corretagem mais alta",
      "Investimento mínimo elevado"
    ],
    contact: "+244 222 638 900",
    location: "Luanda, Talatona"
  },
  {
    name: "Banco BIC",
    type: "Banco Comercial",
    minInvestment: 100000,
    riskLevel: "Baixo",
    advantages: [
      "Excelente reputação no mercado",
      "Assessoria personalizada",
      "Acesso prioritário a IPOs",
      "Produtos diversificados"
    ],
    disadvantages: [
      "Investimento mínimo alto",
      "Menor disponibilidade online"
    ],
    contact: "+244 226 430 100",
    location: "Luanda, Maianga"
  },
  {
    name: "Finibanco Angola",
    type: "Banco de Investimento",
    minInvestment: 250000,
    riskLevel: "Médio",
    advantages: [
      "Especializado em investimentos",
      "Análise de mercado detalhada",
      "Rendimentos competitivos",
      "Equipa de traders experientes"
    ],
    disadvantages: [
      "Foco em grandes investidores",
      "Taxas de performance"
    ],
    contact: "+244 222 700 300",
    location: "Luanda, Ilha"
  },
  {
    name: "Ango Securities",
    type: "Sociedade Corretora",
    minInvestment: 25000,
    riskLevel: "Médio",
    advantages: [
      "Investimento mínimo acessível",
      "Taxas competitivas",
      "Plataforma online intuitiva",
      "Execução rápida de ordens"
    ],
    disadvantages: [
      "Menor rede física",
      "Atendimento apenas em horário comercial"
    ],
    contact: "+244 222 123 456",
    location: "Luanda, Miramar"
  }
];

export default function SavingsCalculator() {
  const [goal, setGoal] = useState(1000000);
  const [months, setMonths] = useState(12);
  const [returnRate, setReturnRate] = useState(8);

  const calculateMonthlyInvestment = () => {
    const monthlyRate = returnRate / 100 / 12;
    if (monthlyRate === 0) return goal / months;
    const monthly = (goal * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
    return monthly;
  };

  const monthlyAmount = calculateMonthlyInvestment();
  const totalInvested = monthlyAmount * months;
  const totalGain = goal - totalInvested;

  const getRecommendedBanks = () => {
    return bankRecommendations
      .filter(bank => totalInvested >= bank.minInvestment)
      .sort((a, b) => a.minInvestment - b.minInvestment);
  };

  const recommendedBanks = getRecommendedBanks();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Baixo": return "text-chart-2";
      case "Médio": return "text-chart-3";
      case "Alto": return "text-destructive";
      default: return "text-foreground";
    }
  };

  return (
    <Card className="border-card-border">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="font-heading text-2xl">Calculadora: Quanto Guardar?</CardTitle>
            <CardDescription className="mt-1">
              Descubra quanto deve investir mensalmente para atingir a sua meta
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal">Meta (AOA)</Label>
            <Input
              id="goal"
              type="number"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              className="text-lg font-semibold"
              data-testid="input-goal"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Prazo (meses)</Label>
              <span className="text-sm font-semibold text-primary">{months} meses</span>
            </div>
            <Slider
              value={[months]}
              onValueChange={(value) => setMonths(value[0])}
              min={1}
              max={120}
              step={1}
              className="cursor-pointer"
              data-testid="slider-months"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Rendimento Estimado (% ao ano)</Label>
              <span className="text-sm font-semibold text-primary">{returnRate}%</span>
            </div>
            <Slider
              value={[returnRate]}
              onValueChange={(value) => setReturnRate(value[0])}
              min={0}
              max={25}
              step={0.5}
              className="cursor-pointer"
              data-testid="slider-return"
            />
          </div>
        </div>

        <div className="bg-primary/5 rounded-xl p-6 space-y-4 border border-primary/20">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Investimento Mensal Necessário</p>
            <p className="text-4xl font-bold font-heading text-primary" data-testid="text-monthly-amount">
              {monthlyAmount.toLocaleString('pt-AO', { maximumFractionDigits: 0 })} AOA
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/20">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Total Investido</p>
              <p className="text-lg font-semibold" data-testid="text-total-invested">
                {totalInvested.toLocaleString('pt-AO', { maximumFractionDigits: 0 })} AOA
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Ganho Estimado</p>
              <p className="text-lg font-semibold text-chart-2" data-testid="text-total-gain">
                +{totalGain.toLocaleString('pt-AO', { maximumFractionDigits: 0 })} AOA
              </p>
            </div>
          </div>
        </div>

        {goal > 0 && recommendedBanks.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-border">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Bancos Recomendados para o Seu Perfil</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Com base na sua meta de {goal.toLocaleString('pt-AO')} AOA, estes bancos são adequados:
            </p>
            <div className="space-y-4">
              {recommendedBanks.map((bank) => (
                <Card key={bank.name} className="border-card-border">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-lg">{bank.name}</h4>
                          <p className="text-sm text-muted-foreground">{bank.type}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={getRiskColor(bank.riskLevel)}
                          data-testid={`badge-risk-${bank.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          Risco {bank.riskLevel}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-chart-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Vantagens</span>
                          </div>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {bank.advantages.map((advantage, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-chart-2 mt-1">•</span>
                                <span>{advantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            <span>Desvantagens</span>
                          </div>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {bank.disadvantages.map((disadvantage, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-destructive mt-1">•</span>
                                <span>{disadvantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Investimento Mínimo</p>
                          <p className="font-semibold">
                            {bank.minInvestment.toLocaleString('pt-AO')} AOA
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Contacto</p>
                          <p className="font-semibold">{bank.contact}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {goal > 0 && recommendedBanks.length === 0 && (
          <div className="pt-6 border-t border-border">
            <div className="text-center p-6 bg-muted/50 rounded-xl">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                O valor total a investir ({totalInvested.toLocaleString('pt-AO')} AOA) é inferior ao investimento mínimo dos bancos disponíveis. 
                Considere aumentar o prazo ou a meta.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
