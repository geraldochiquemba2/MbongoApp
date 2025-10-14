# Integração com APIs de Notícias em Tempo Real

## Visão Geral

Atualmente, a página de notícias usa dados simulados baseados em informações reais do setor financeiro angolano. Este documento explica como integrar com APIs reais de notícias para obter atualizações em tempo real.

## Atualização Dinâmica Atual

O sistema já possui:
- ✅ **Auto-refresh a cada 5 minutos** - as notícias são atualizadas automaticamente
- ✅ **Refresh manual** - botão para atualizar instantaneamente
- ✅ **Indicador de última atualização** - mostra quando foi a última atualização
- ✅ **Refresh ao focar janela** - atualiza quando o usuário volta à página

## APIs de Notícias Disponíveis

### 1. NewsAPI (Recomendado para início)
**Website:** https://newsapi.org

**Vantagens:**
- API gratuita (até 100 requisições/dia)
- Suporta filtros por país, categoria e palavra-chave
- Fácil de usar

**Exemplo de uso:**
```typescript
const API_KEY = process.env.NEWS_API_KEY;
const response = await fetch(
  `https://newsapi.org/v2/everything?q=Angola+finance+banking&language=pt&sortBy=publishedAt&apiKey=${API_KEY}`
);
const data = await response.json();
```

### 2. Alpha Vantage
**Website:** https://www.alphavantage.co

**Vantagens:**
- API de notícias financeiras com análise de sentimento
- Dados globais com filtros por tópicos
- Tier gratuito disponível

**Exemplo de uso:**
```typescript
const API_KEY = process.env.ALPHA_VANTAGE_KEY;
const response = await fetch(
  `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=financial_markets&apikey=${API_KEY}`
);
```

### 3. Finage (Tempo Real)
**Website:** https://finage.co.uk

**Vantagens:**
- WebSocket para streaming em tempo real
- Notícias financeiras de 55+ mercados
- API REST também disponível

**Exemplo WebSocket:**
```typescript
const socket = new WebSocket('wss://api.finage.co.uk/news/stream?apikey=YOUR_KEY');
socket.onmessage = (event) => {
  const news = JSON.parse(event.data);
  // Processar notícia em tempo real
};
```

## Passos para Integração

### 1. Escolher e Configurar API

```bash
# Adicionar chave API nas variáveis de ambiente
# No Replit, use a ferramenta de Secrets
NEWS_API_KEY=sua_chave_aqui
```

### 2. Atualizar server/routes.ts

Substituir a seção de dados mock por chamadas reais à API:

```typescript
// server/routes.ts
app.get("/api/news", async (req, res) => {
  try {
    const API_KEY = process.env.NEWS_API_KEY;
    
    // Buscar notícias da API
    const response = await fetch(
      `https://newsapi.org/v2/everything?` +
      `q=Angola+finanças+economia+BNA+BODIVA+CMC&` +
      `language=pt&` +
      `sortBy=publishedAt&` +
      `apiKey=${API_KEY}`
    );
    
    const data = await response.json();
    
    // Transformar para o formato NewsArticle
    const articles: NewsArticle[] = data.articles.map((article: any) => ({
      id: article.url, // usar URL como ID único
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.url,
      source: article.source.name,
      category: categorizarNoticia(article.title, article.description),
      publishedAt: new Date(article.publishedAt),
      imageUrl: article.urlToImage,
      important: determinarImportancia(article.title),
    }));
    
    res.json(articles);
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    res.status(500).json({ message: "Erro ao buscar notícias" });
  }
});

// Função auxiliar para categorizar
function categorizarNoticia(title: string, description: string): string {
  const texto = `${title} ${description}`.toLowerCase();
  
  if (texto.includes('bna') || texto.includes('taxa de juro')) return 'Política Monetária';
  if (texto.includes('cmc') || texto.includes('regulamento')) return 'Regulação';
  if (texto.includes('bodiva') || texto.includes('bolsa')) return 'Mercado de Capitais';
  if (texto.includes('banco') || texto.includes('crédito')) return 'Banking';
  if (texto.includes('kwanza') || texto.includes('câmbio')) return 'Câmbio';
  
  return 'Economia';
}

// Função para determinar importância
function determinarImportancia(title: string): number {
  const palavrasChave = ['urgente', 'importante', 'breaking', 'bna', 'cmc'];
  return palavrasChave.some(palavra => title.toLowerCase().includes(palavra)) ? 1 : 0;
}
```

### 3. Fontes de Notícias Angolanas

Para notícias mais específicas de Angola, considere também:

**Fontes Oficiais:**
- BNA (Banco Nacional de Angola): https://www.bna.ao
- BODIVA: https://www.bodiva.ao  
- CMC (Comissão do Mercado de Capitais): https://www.cmc.ao
- FMI - Angola: https://www.imf.org/en/Countries/AGO

**Scraping (Avançado):**
Se as APIs não cobrirem Angola adequadamente, considere web scraping das fontes oficiais acima usando:
- Puppeteer ou Playwright
- Cheerio para parsing HTML
- Cron jobs para atualização periódica

### 4. Cache e Performance

Para melhorar performance e reduzir custos de API:

```typescript
// Implementar cache no backend
let newsCache: { data: NewsArticle[], timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

app.get("/api/news", async (req, res) => {
  // Verificar cache
  if (newsCache && Date.now() - newsCache.timestamp < CACHE_DURATION) {
    return res.json(newsCache.data);
  }
  
  // Buscar novas notícias...
  const articles = await fetchNewsFromAPI();
  
  // Atualizar cache
  newsCache = { data: articles, timestamp: Date.now() };
  
  res.json(articles);
});
```

## Implementação com WebSockets (Tempo Real)

Para atualizações em tempo real verdadeiras:

```typescript
// server/index.ts - adicionar WebSocket
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
  // Conectar com API de streaming
  const newsStream = connectToNewsStream();
  
  newsStream.on('news', (article) => {
    ws.send(JSON.stringify(article));
  });
});

// client - conectar ao WebSocket
const ws = new WebSocket('ws://localhost:5000/ws/news');
ws.onmessage = (event) => {
  const newArticle = JSON.parse(event.data);
  queryClient.setQueryData(['/api/news'], (old: NewsArticle[]) => 
    [newArticle, ...old]
  );
};
```

## Monitoramento e Logs

Adicione logs para monitorar as chamadas à API:

```typescript
console.log(`[NEWS API] Fetched ${articles.length} articles at ${new Date().toISOString()}`);
console.log(`[NEWS API] Categories: ${Array.from(new Set(articles.map(a => a.category))).join(', ')}`);
```

## Custos e Limites

**APIs Gratuitas:**
- NewsAPI: 100 req/dia
- Alpha Vantage: 25 req/dia (tier gratuito)

**Recomendação:** Implemente cache no backend para minimizar chamadas à API e manter dentro dos limites gratuitos.

## Próximos Passos

1. Escolher a API (NewsAPI recomendado para começar)
2. Registrar e obter chave API
3. Adicionar chave no Secrets do Replit
4. Atualizar `server/routes.ts` com código de integração
5. Testar e ajustar categorização/importância
6. (Opcional) Implementar cache para otimizar
7. (Avançado) Adicionar WebSocket para tempo real
