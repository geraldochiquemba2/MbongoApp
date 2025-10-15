import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wallet, TrendingUp, Plus, ArrowUpRight, Target, Calendar, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Wallet as WalletType, SubWallet } from "@shared/schema";
import backgroundImage from "@assets/pexels-eberhardgross-2086361_1760557682629.jpg";

const createSubWalletSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  goal: z.string().min(10, "Objetivo deve ter no mínimo 10 caracteres"),
  targetAmount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Valor deve ser maior que zero"),
  targetDate: z.string().min(1, "Data é obrigatória"),
  investmentType: z.string().min(1, "Tipo de investimento é obrigatório"),
});

const addTransactionSchema = z.object({
  subWalletId: z.string(),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Valor deve ser maior que zero"),
  description: z.string().optional(),
});

export default function CarteiraPage() {
  const { user } = useUser();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [selectedSubWallet, setSelectedSubWallet] = useState<SubWallet | null>(null);

  const { data, isLoading } = useQuery<{ wallet: WalletType; subWallets: SubWallet[] }>({
    queryKey: ["/api/wallet"],
    enabled: !!user,
  });

  const createSubWalletMutation = useMutation({
    mutationFn: async (values: z.infer<typeof createSubWalletSchema>) => {
      return await apiRequest("/api/wallet/subwallets", {
        method: "POST",
        body: JSON.stringify(values),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wallet"] });
      setCreateDialogOpen(false);
      toast({
        title: "Subcarteira criada",
        description: "Sua subcarteira foi criada com sucesso!",
      });
      createForm.reset();
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erro ao criar subcarteira",
        description: error.message,
      });
    },
  });

  const addTransactionMutation = useMutation({
    mutationFn: async (values: z.infer<typeof addTransactionSchema>) => {
      return await apiRequest("/api/wallet/transactions", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          type: "deposit",
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wallet"] });
      setDepositDialogOpen(false);
      setSelectedSubWallet(null);
      toast({
        title: "Depósito realizado",
        description: "Seu depósito foi registrado com sucesso!",
      });
      transactionForm.reset();
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar depósito",
        description: error.message,
      });
    },
  });

  const createForm = useForm<z.infer<typeof createSubWalletSchema>>({
    resolver: zodResolver(createSubWalletSchema),
    defaultValues: {
      name: "",
      goal: "",
      targetAmount: "",
      targetDate: "",
      investmentType: "",
    },
  });

  const transactionForm = useForm<z.infer<typeof addTransactionSchema>>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      subWalletId: "",
      amount: "",
      description: "",
    },
  });

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${backgroundImage}')`
          }}
        >
          <Card className="max-w-md mx-4">
            <CardHeader>
              <CardTitle>Acesso Restrito</CardTitle>
              <CardDescription>
                Faça login para acessar sua Carteira Digital de Reserva
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/entrar")} className="w-full" data-testid="button-goto-login">
                Fazer Login
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Carregando carteira...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { wallet, subWallets } = data || { wallet: null, subWallets: [] };

  const investmentTypes = [
    { value: "bilhetes_tesouro", label: "Bilhetes do Tesouro (BT)" },
    { value: "obrigacoes_tesouro", label: "Obrigações do Tesouro (OT)" },
    { value: "acoes", label: "Ações na BODIVA" },
    { value: "fundos", label: "Fundos de Investimento" },
    { value: "ipo", label: "IPO (Oferta Pública Inicial)" },
    { value: "outro", label: "Outro" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Navbar />
      <main className="flex-1 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${backgroundImage}')`
        }}
      >
        <section className="relative py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                <Wallet className="h-12 w-12 text-white" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
                Carteira Digital de Reserva
              </h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Acumule fundos de forma segura e orientada aos seus objetivos de investimento
              </p>
            </div>

            <div className="mb-8">
              <Card className="bg-gradient-to-br from-primary/10 to-chart-1/10 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardDescription>Saldo Total</CardDescription>
                      <CardTitle className="text-4xl font-bold text-primary">
                        {parseFloat(wallet?.totalBalance || "0").toLocaleString("pt-AO", {
                          style: "currency",
                          currency: "AOA",
                        })}
                      </CardTitle>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-2xl">
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-heading font-bold text-white">
                Minhas Subcarteiras
              </h2>
              <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button data-testid="button-create-subwallet">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Subcarteira
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Criar Nova Subcarteira</DialogTitle>
                    <DialogDescription>
                      Defina um objetivo e meta de poupança para sua subcarteira
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...createForm}>
                    <form onSubmit={createForm.handleSubmit((values) => createSubWalletMutation.mutate(values))} className="space-y-4">
                      <FormField
                        control={createForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da Subcarteira</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Reserva para Ações" {...field} data-testid="input-subwallet-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="goal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Objetivo</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Descreva seu objetivo de investimento" {...field} data-testid="input-subwallet-goal" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="investmentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de Investimento</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-investment-type">
                                  <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {investmentTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="targetAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valor Meta (AOA)</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" placeholder="100000" {...field} data-testid="input-target-amount" />
                            </FormControl>
                            <FormDescription>
                              Quanto você deseja acumular?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="targetDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data Meta</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} data-testid="input-target-date" />
                            </FormControl>
                            <FormDescription>
                              Quando você pretende investir?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={createSubWalletMutation.isPending} data-testid="button-submit-subwallet">
                        {createSubWalletMutation.isPending ? "Criando..." : "Criar Subcarteira"}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {subWallets.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    Você ainda não tem nenhuma subcarteira criada
                  </p>
                  <Button onClick={() => setCreateDialogOpen(true)} data-testid="button-create-first-subwallet">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeira Subcarteira
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subWallets.map((subWallet) => {
                  const progress = (parseFloat(subWallet.currentAmount) / parseFloat(subWallet.targetAmount)) * 100;
                  const targetDate = new Date(subWallet.targetDate);
                  const daysRemaining = Math.ceil((targetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  const investmentType = investmentTypes.find(t => t.value === subWallet.investmentType);

                  return (
                    <Card key={subWallet.id} data-testid={`card-subwallet-${subWallet.id}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-1">{subWallet.name}</CardTitle>
                            <CardDescription className="line-clamp-2">{subWallet.goal}</CardDescription>
                          </div>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => {
                              setSelectedSubWallet(subWallet);
                              transactionForm.setValue("subWalletId", subWallet.id);
                              setDepositDialogOpen(true);
                            }}
                            data-testid={`button-add-deposit-${subWallet.id}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-accent/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{investmentType?.label}</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progresso</span>
                            <span className="font-semibold text-primary">{Math.min(progress, 100).toFixed(1)}%</span>
                          </div>
                          <Progress value={Math.min(progress, 100)} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Atual</p>
                            <p className="font-semibold" data-testid={`text-current-${subWallet.id}`}>
                              {parseFloat(subWallet.currentAmount).toLocaleString("pt-AO", {
                                style: "currency",
                                currency: "AOA",
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Meta</p>
                            <p className="font-semibold" data-testid={`text-target-${subWallet.id}`}>
                              {parseFloat(subWallet.targetAmount).toLocaleString("pt-AO", {
                                style: "currency",
                                currency: "AOA",
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {format(targetDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                          </span>
                          {daysRemaining > 0 && (
                            <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {daysRemaining} dias
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Depósito</DialogTitle>
            <DialogDescription>
              {selectedSubWallet ? `Adicionar fundos em: ${selectedSubWallet.name}` : "Selecione uma subcarteira"}
            </DialogDescription>
          </DialogHeader>
          <Form {...transactionForm}>
            <form onSubmit={transactionForm.handleSubmit((values) => addTransactionMutation.mutate(values))} className="space-y-4">
              <FormField
                control={transactionForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor do Depósito (AOA)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="5000" {...field} data-testid="input-deposit-amount" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={transactionForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Depósito mensal" {...field} data-testid="input-deposit-description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Métodos de depósito disponíveis:</strong>
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Multicaixa Express</li>
                  <li>Mobile Money</li>
                  <li>Transferência bancária</li>
                </ul>
              </div>
              <Button type="submit" className="w-full" disabled={addTransactionMutation.isPending} data-testid="button-submit-deposit">
                {addTransactionMutation.isPending ? "Processando..." : "Adicionar Depósito"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
