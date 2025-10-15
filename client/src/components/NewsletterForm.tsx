import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Loader2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter/subscribe", { email });
    },
    onSuccess: () => {
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá atualizações sobre oportunidades de investimento.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Erro na inscrição",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, insira seu email.",
        variant: "destructive",
      });
      return;
    }

    subscribeMutation.mutate(email);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md w-full">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={subscribeMutation.isPending}
          className="pl-10"
          data-testid="input-newsletter-email"
        />
      </div>
      <Button 
        type="submit" 
        disabled={subscribeMutation.isPending}
        data-testid="button-newsletter-subscribe"
      >
        {subscribeMutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="ml-2">A inscrever...</span>
          </>
        ) : (
          "Inscrever"
        )}
      </Button>
    </form>
  );
}
