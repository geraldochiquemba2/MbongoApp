import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { TrendingUp } from "lucide-react";

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
      </CardContent>
    </Card>
  );
}
