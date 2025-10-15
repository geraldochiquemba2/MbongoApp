import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "O que são Títulos do Tesouro?",
  "Como funciona a BODIVA?",
  "Qual a diferença entre perfil conservador e arrojado?",
  "O que é um IPO?",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const manualStopRef = useRef(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", { message });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages((prev) => {
        const newMessages: Message[] = [
          ...prev,
          { role: "assistant" as const, content: data.reply },
        ];
        
        // Reproduzir áudio automaticamente
        setTimeout(() => {
          const lastAssistantIndex = newMessages.length - 1;
          handlePlayAudio(data.reply, lastAssistantIndex);
        }, 100);
        
        return newMessages;
      });
    },
    onError: (error) => {
      setMessages((prev) => prev.slice(0, -1));
      toast({
        title: "Erro ao processar pergunta",
        description: error instanceof Error ? error.message : "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    chatMutation.mutate(userMessage);
  };

  const handleSuggestedQuestion = (question: string) => {
    if (chatMutation.isPending) return;
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    chatMutation.mutate(question);
  };

  const getPortugueseVoice = () => {
    if (selectedVoiceRef.current) {
      return selectedVoiceRef.current;
    }

    const voices = window.speechSynthesis.getVoices();
    
    const ptBRVoice = voices.find(voice => voice.lang === 'pt-BR');
    if (ptBRVoice) {
      selectedVoiceRef.current = ptBRVoice;
      return ptBRVoice;
    }

    const ptVoice = voices.find(voice => voice.lang.startsWith('pt'));
    if (ptVoice) {
      selectedVoiceRef.current = ptVoice;
      return ptVoice;
    }

    if (voices.length > 0) {
      selectedVoiceRef.current = voices[0];
      return voices[0];
    }

    return null;
  };

  const cleanTextForSpeech = (text: string): string => {
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#+\s/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/_{1,2}/g, '')
      .replace(/~{1,2}/g, '')
      .trim();
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handlePlayAudio = (text: string, index: number) => {
    if (playingIndex === index) {
      manualStopRef.current = true;
      window.speechSynthesis.cancel();
      setPlayingIndex(null);
      return;
    }

    if (!('speechSynthesis' in window)) {
      toast({
        title: "Recurso não disponível",
        description: "Seu navegador não suporta síntese de voz.",
        variant: "destructive",
      });
      return;
    }

    const loadVoicesAndSpeak = () => {
      manualStopRef.current = false;
      window.speechSynthesis.cancel();

      const cleanedText = cleanTextForSpeech(text);
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const voice = getPortugueseVoice();
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onend = () => {
        setPlayingIndex(null);
        utteranceRef.current = null;
        manualStopRef.current = false;
      };

      utterance.onerror = () => {
        setPlayingIndex(null);
        utteranceRef.current = null;
        
        // Só mostra erro se não foi um stop manual
        if (!manualStopRef.current) {
          toast({
            title: "Erro ao reproduzir áudio",
            description: "Não foi possível reproduzir o áudio.",
            variant: "destructive",
          });
        }
        manualStopRef.current = false;
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setPlayingIndex(index);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        loadVoicesAndSpeak();
      }, { once: true });
    } else {
      loadVoicesAndSpeak();
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="font-heading text-2xl">Assistente de Investimentos</CardTitle>
            <CardDescription>
              Pergunte-me qualquer coisa sobre investimentos em Angola
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {messages.length === 0 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">Sugestões para começar:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleSuggestedQuestion(question)}
                  disabled={chatMutation.isPending}
                  className="justify-start text-left h-auto py-3"
                  data-testid={`button-suggestion-${index}`}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative">
            <ScrollArea ref={scrollAreaRef} className="h-[400px] pr-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="p-2 bg-primary/10 rounded-lg h-fit">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div className="flex flex-col gap-2 max-w-[80%]">
                      <div
                        className={`rounded-lg px-4 py-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent"
                        }`}
                        data-testid={`message-${message.role}-${index}`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      {message.role === "assistant" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePlayAudio(message.content, index)}
                          className="self-start"
                          data-testid={`button-play-audio-${index}`}
                        >
                          {playingIndex === index ? (
                            <>
                              <VolumeX className="h-4 w-4 mr-2" />
                              Parar
                            </>
                          ) : (
                            <>
                              <Volume2 className="h-4 w-4 mr-2" />
                              Ouvir resposta
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {chatMutation.isPending && (
                  <div className="flex gap-3 justify-start">
                    <div className="p-2 bg-primary/10 rounded-lg h-fit">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-accent rounded-lg px-4 py-3">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {playingIndex !== null && (
              <div className="sticky bottom-0 left-0 right-0 z-50 bg-card border-t border-border mt-2 p-3 rounded-md shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Volume2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground truncate">
                      Reproduzindo resposta...
                    </span>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      manualStopRef.current = true;
                      window.speechSynthesis.cancel();
                      setPlayingIndex(null);
                    }}
                    data-testid="button-stop-audio-fixed"
                  >
                    <VolumeX className="h-4 w-4 mr-2" />
                    Parar
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Faça uma pergunta sobre investimentos..."
            className="resize-none min-h-[60px]"
            disabled={chatMutation.isPending}
            data-testid="input-chat-message"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || chatMutation.isPending}
            data-testid="button-send-message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center">
          Powered by Groq (Llama 3.3 70B) + Síntese de Voz em Português
        </p>
      </CardContent>
    </Card>
  );
}
