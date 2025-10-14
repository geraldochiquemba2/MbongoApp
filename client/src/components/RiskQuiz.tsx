import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, TrendingUp, AlertTriangle } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Qual é o seu principal objetivo ao investir?",
    options: [
      { value: "conservative", label: "Preservar o capital com segurança", score: 1 },
      { value: "moderate", label: "Crescimento moderado com algum risco", score: 2 },
      { value: "aggressive", label: "Máximo crescimento, aceito mais risco", score: 3 }
    ]
  },
  {
    id: 2,
    question: "Por quanto tempo planeia manter o investimento?",
    options: [
      { value: "short", label: "Menos de 1 ano", score: 1 },
      { value: "medium", label: "1 a 3 anos", score: 2 },
      { value: "long", label: "Mais de 3 anos", score: 3 }
    ]
  },
  {
    id: 3,
    question: "Como reagiria se o seu investimento perdesse 20% do valor?",
    options: [
      { value: "sell", label: "Venderia imediatamente", score: 1 },
      { value: "wait", label: "Esperaria recuperar", score: 2 },
      { value: "buy", label: "Compraria mais a preço baixo", score: 3 }
    ]
  }
];

const profiles = {
  conservative: {
    title: "Perfil Conservador",
    icon: Shield,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    description: "Você prefere segurança e estabilidade. Recomendamos Títulos do Tesouro (BT/OT) com taxas fixas.",
    products: ["Bilhetes do Tesouro", "Obrigações do Tesouro de curto prazo"]
  },
  moderate: {
    title: "Perfil Moderado",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "Você equilibra risco e retorno. Recomendamos uma carteira mista de títulos e ações estáveis.",
    products: ["Títulos do Tesouro", "Ações de empresas consolidadas", "Fundos diversificados"]
  },
  aggressive: {
    title: "Perfil Arrojado",
    icon: AlertTriangle,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    description: "Você busca crescimento máximo e aceita volatilidade. Recomendamos ações e IPOs.",
    products: ["Ações de crescimento", "IPOs", "Fundos de ações"]
  }
};

export default function RiskQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateProfile = () => {
    const totalScore = questions.reduce((sum, q) => {
      const answer = answers[questions.indexOf(q)];
      const option = q.options.find(o => o.value === answer);
      return sum + (option?.score || 0);
    }, 0);

    if (totalScore <= 4) return "conservative";
    if (totalScore <= 7) return "moderate";
    return "aggressive";
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    const profileKey = calculateProfile() as keyof typeof profiles;
    const profile = profiles[profileKey];
    const Icon = profile.icon;

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className={`inline-flex p-4 ${profile.bgColor} rounded-2xl mx-auto mb-4`}>
            <Icon className={`h-12 w-12 ${profile.color}`} />
          </div>
          <CardTitle className="font-heading text-2xl">{profile.title}</CardTitle>
          <CardDescription className="text-base mt-2">
            {profile.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Produtos Recomendados:</h4>
            <ul className="space-y-2">
              {profile.products.map((product, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  {product}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-3">
            <Button onClick={resetQuiz} variant="outline" className="flex-1" data-testid="button-restart-quiz">
              Refazer Teste
            </Button>
            <Button className="flex-1" data-testid="button-view-products">
              Ver Produtos
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Questão {currentQuestion + 1} de {questions.length}</span>
            <span className="font-semibold text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-accent rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <CardTitle className="font-heading text-xl">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup 
          value={answers[currentQuestion] || ""} 
          onValueChange={handleAnswer}
        >
          {question.options.map((option) => (
            <div 
              key={option.value} 
              className="flex items-start space-x-3 p-4 rounded-lg hover-elevate border transition-all duration-200"
            >
              <RadioGroupItem value={option.value} id={option.value} data-testid={`radio-${option.value}`} />
              <Label htmlFor={option.value} className="flex-1 cursor-pointer font-normal">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <Button 
          onClick={handleNext} 
          disabled={!answers[currentQuestion]}
          className="w-full"
          data-testid="button-next-question"
        >
          {currentQuestion < questions.length - 1 ? "Próxima Questão" : "Ver Resultado"}
        </Button>
      </CardContent>
    </Card>
  );
}
