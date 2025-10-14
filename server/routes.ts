import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import type { NewsArticle } from "@shared/schema";
import Groq from "groq-sdk";

export async function registerRoutes(app: Express): Promise<Server> {
  // News API endpoint - fetches financial news from Angola
  app.get("/api/news", async (req, res) => {
    try {
      /* 
       * INTEGRAÇÃO COM API REAL DE NOTÍCIAS
       * ====================================
       * 
       * Para obter notícias reais em tempo real, siga os passos em:
       * docs/NEWS_API_INTEGRATION.md
       * 
       * Opções de APIs:
       * 1. NewsAPI (https://newsapi.org) - Recomendado para começar
       * 2. Alpha Vantage (https://alphavantage.co) - Notícias financeiras
       * 3. Finage (https://finage.co.uk) - Streaming em tempo real
       * 
       * Exemplo de integração com NewsAPI:
       * 
       * const API_KEY = process.env.NEWS_API_KEY;
       * const response = await fetch(
       *   `https://newsapi.org/v2/everything?q=Angola+finanças&language=pt&apiKey=${API_KEY}`
       * );
       * const data = await response.json();
       * const articles = data.articles.map(transformToNewsArticle);
       * return res.json(articles);
       * 
       * O frontend já está configurado para:
       * - Auto-refresh a cada 5 minutos
       * - Refresh manual
       * - Indicador de última atualização
       */
      
      // DADOS SIMULADOS - Baseados em informação real do setor financeiro angolano
      // Substitua este bloco pela chamada à API real
      
      const mockNews: NewsArticle[] = [
        {
          id: "1",
          title: "BNA mantém taxa de juro de referência em 19% para controlar inflação",
          description: "Banco Nacional de Angola decide manter a taxa básica de juro em 19% após reunião do Comité de Política Monetária, visando controlar a inflação que deve fechar 2025 em 12,4%.",
          content: "O Banco Nacional de Angola (BNA) decidiu manter a taxa básica de juro em 19% após a última reunião do Comité de Política Monetária. A decisão visa controlar a inflação, que segundo projeções do FMI deve fechar 2025 em torno de 12,4%. O governador do BNA destacou que a medida é prudente dado o contexto de volatilidade dos preços do petróleo no mercado internacional.",
          url: "https://www.bna.ao",
          source: "Banco Nacional de Angola",
          category: "Política Monetária",
          publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
          important: 1
        },
        {
          id: "2",
          title: "CMC aprova novo regulamento para IPOs no mercado de capitais angolano",
          description: "Comissão do Mercado de Capitais estabelece novas regras para ofertas públicas iniciais, facilitando o acesso de empresas à BODIVA.",
          content: "A Comissão do Mercado de Capitais (CMC) aprovou um novo regulamento para ofertas públicas iniciais (IPOs) que visa simplificar o processo de listagem na BODIVA. As novas regras reduzem o tempo de aprovação de 90 para 60 dias e diminuem os custos regulatórios em cerca de 30%, tornando o mercado de capitais mais acessível para empresas de médio porte.",
          url: "https://www.cmc.ao",
          source: "Comissão do Mercado de Capitais",
          category: "Regulação",
          publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
          important: 1
        },
        {
          id: "3",
          title: "BODIVA regista crescimento de 15% no volume de negócios no primeiro semestre",
          description: "Bolsa de Dívida e Valores de Angola apresenta resultados positivos com aumento significativo nas transações de títulos do tesouro.",
          content: "A Bolsa de Dívida e Valores de Angola (BODIVA) registou um crescimento de 15% no volume de negócios durante o primeiro semestre de 2025. O aumento é atribuído principalmente ao maior interesse em títulos do tesouro por parte de investidores institucionais, numa altura em que o governo busca diversificar suas fontes de financiamento.",
          url: "https://www.bodiva.ao",
          source: "BODIVA",
          category: "Mercado de Capitais",
          publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
          important: 0
        },
        {
          id: "4",
          title: "FMI projeta crescimento econômico de Angola em 2,4% para 2025",
          description: "Fundo Monetário Internacional revê projeções para economia angolana, destacando impacto da queda dos preços do petróleo.",
          content: "O Fundo Monetário Internacional (FMI) divulgou suas novas projeções para a economia angolana, estimando um crescimento do PIB de 2,4% em 2025, abaixo dos 4,4% registados em 2024. A revisão em baixa deve-se principalmente à queda dos preços do petróleo no mercado internacional e aos desafios na diversificação econômica.",
          url: "https://www.imf.org/angola",
          source: "FMI",
          category: "Economia",
          publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
          important: 1
        },
        {
          id: "5",
          title: "Bancos angolanos expandem serviços digitais com foco em inclusão financeira",
          description: "Instituições financeiras investem em plataformas digitais para alcançar população não bancarizada em zonas rurais.",
          content: "Os principais bancos angolanos estão a expandir significativamente seus serviços digitais, com especial foco na inclusão financeira das populações em zonas rurais. Segundo dados do sector, mais de 2 milhões de novas contas digitais foram abertas no último ano, representando um aumento de 40% face a 2024.",
          url: "https://www.banking-angola.com",
          source: "Associação Angolana de Bancos",
          category: "Banking Digital",
          publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
          important: 0
        },
        {
          id: "6",
          title: "Kwanza desvaloriza 8% face ao dólar no acumulado do ano",
          description: "Moeda nacional enfrenta pressão cambial devido à redução das receitas petrolíferas e aumento da procura por divisas.",
          content: "O Kwanza acumula uma desvalorização de 8% face ao dólar americano no ano de 2025, refletindo a pressão sobre as reservas internacionais devido à queda dos preços do petróleo. O BNA tem intervindo no mercado cambial para conter a volatilidade, mas economistas alertam para a necessidade de acelerar a diversificação econômica.",
          url: "https://www.bna.ao/cambio",
          source: "Banco Nacional de Angola",
          category: "Câmbio",
          publishedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
          important: 1
        },
        {
          id: "7",
          title: "Angola lança programa de privatizações no sector financeiro",
          description: "Governo anuncia venda de participações em bancos e seguradoras, com previsão de listar 30% dos ativos na BODIVA.",
          content: "O governo angolano lançou oficialmente o programa de privatizações no sector financeiro, que prevê a venda de participações do Estado em diversos bancos e companhias de seguros. A iniciativa faz parte da estratégia de consolidação fiscal e desenvolvimento do mercado de capitais, com meta de listar 30% dos ativos na BODIVA até o final de 2025.",
          url: "https://www.minfin.gov.ao",
          source: "Ministério das Finanças",
          category: "Privatizações",
          publishedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
          important: 1
        },
        {
          id: "8",
          title: "Títulos do Tesouro angolanos oferecem rendimento de até 15% ao ano",
          description: "Emissão de títulos públicos atrai investidores em busca de rentabilidade superior à inflação projetada.",
          content: "Os Títulos do Tesouro Nacional angolanos estão a oferecer taxas de rendimento de até 15% ao ano em suas últimas emissões, atraindo investidores institucionais e individuais que buscam proteção contra a inflação. Com a inflação projetada em 12,4% para 2025, os títulos oferecem um retorno real positivo, tornando-se uma opção interessante no cenário actual.",
          url: "https://www.minfin.gov.ao/titulos",
          source: "Tesouro Nacional",
          category: "Títulos Públicos",
          publishedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
          important: 0
        }
      ];

      // Sort by date (most recent first)
      const sortedNews = mockNews.sort((a, b) => 
        b.publishedAt.getTime() - a.publishedAt.getTime()
      );

      res.json(sortedNews);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Erro ao buscar notícias" });
    }
  });

  // Groq AI Chat endpoint - assistente de aprendizagem sobre investimentos
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ message: "Mensagem inválida" });
      }

      if (!process.env.GROQ_API_KEY) {
        return res.status(500).json({ message: "Chave de API do Groq não configurada" });
      }

      const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
      });

      const systemPrompt = `Você é um assistente educativo especializado em investimentos no mercado financeiro angolano. Seu objetivo é ajudar os usuários a aprender sobre:

- Títulos do Tesouro (Bilhetes do Tesouro e Obrigações do Tesouro)
- Ações na BODIVA (Bolsa de Dívida e Valores de Angola)
- Fundos de investimento
- IPOs (Ofertas Públicas Iniciais)
- Perfis de risco (conservador, moderado, arrojado)
- Diversificação de carteira
- Conceitos financeiros básicos

Mantenha suas respostas:
- Educativas e acessíveis para iniciantes
- Focadas no contexto angolano
- Claras e objetivas (máximo 300 palavras)
- Em português de Angola

Não dê conselhos financeiros específicos ou recomendações de compra/venda. Apenas eduque.`;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1024,
      });

      const reply = chatCompletion.choices[0]?.message?.content || "Desculpe, não consegui processar a sua pergunta.";

      res.json({ reply });
    } catch (error) {
      console.error("Error with Groq API:", error);
      res.status(500).json({ message: "Erro ao processar a sua pergunta" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
