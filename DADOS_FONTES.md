# Fontes de Dados - Plataforma de Investimentos Angola

Este documento descreve as fontes dos dados utilizados na plataforma e como mantê-los atualizados.

## 📊 Dados Atuais (2025)

### Ações da BODIVA

As seguintes empresas estão atualmente listadas na Bolsa de Dívida e Valores de Angola (BODIVA):

| Empresa | Ticker | Setor | Status |
|---------|--------|-------|--------|
| **Banco de Fomento Angola** | BFA | Financeiro | IPO realizado em Set/2025 - Maior IPO da história de Angola ($239M) |
| **ENSA** | ENSA | Energia | Listada |
| **ACREP** | ACREP | Seguros | Listada |
| **BODIVA** | BODIVA | Mercados Financeiros | Listada (a própria bolsa) |

**Fonte:** BODIVA (https://www.bodiva.ao), Bloomberg, African Capital Markets News

### Títulos do Tesouro

As taxas de juros dos títulos do tesouro angolano são baseadas em informações do Banco Nacional de Angola:

| Título | Taxa Aproximada | Investimento Mínimo |
|--------|----------------|---------------------|
| Bilhete do Tesouro 91 dias | 16.5% a.a. | 100,000 AOA |
| Bilhete do Tesouro 182 dias | 17.0% a.a. | 100,000 AOA |
| Bilhete do Tesouro 364 dias | 17.5% a.a. | 100,000 AOA |
| Obrigação do Tesouro 2 anos | 19.0% a.a. | 500,000 AOA |
| Obrigação do Tesouro 5 anos | 21.5% a.a. | 1,000,000 AOA |

**Taxas de Referência (2025):**
- Taxa de Bilhete do Tesouro (Government Securities): 17.5% a.a.
- Taxa de Juros Central BNA: 19%
- Taxa de Empréstimo: 20.5%

**Fontes:** Banco Nacional de Angola (http://www.bna.ao), CEIC Data, Trading Economics

## 🔄 Atualização de Dados

### Situação Atual

**Importante:** Atualmente, nem a BODIVA nem o Banco Nacional de Angola disponibilizam APIs públicas para acesso a dados em tempo real. Os dados apresentados na plataforma são:

- ✅ Baseados em informações reais de mercado (2025)
- ✅ Atualizados manualmente com base em fontes oficiais
- ⚠️ Ilustrativos e podem não refletir os valores exatos de negociação em tempo real

### Opções para Dados em Tempo Real (Futuro)

Para implementar dados verdadeiramente em tempo real, existem as seguintes opções:

#### 1. APIs Comerciais (Pagas)

**CBonds API** (Recomendado para títulos)
- Cobertura: 900,000+ bonds globalmente, incluindo Angola
- Features: Dados de referência, leilões, novos lançamentos
- Site: https://cbonds.com/api/
- Custo: Sob consulta (pay-per-data)

**Bloomberg Terminal / Refinitiv**
- Cobertura completa de BODIVA
- Custo: $2,000-$25,000/mês (terminal completo)

**EODHD APIs**
- Bonds fundamentals e histórico
- Formato: JSON
- Limitação: Apenas dados de fim de dia (EOD)
- Site: https://eodhd.com/financial-apis/bonds-fundamentals-and-historical-api

#### 2. Contato Direto com Instituições

**BODIVA**
- Website: https://www.bodiva.ao/?lang=en
- Solicitar: Feed de dados institucional ou histórico
- Status: Sem API pública documentada (ainda)

**Banco Nacional de Angola**
- Website: http://www.bna.ao
- SDMX API: Disponível para algumas métricas econômicas
- Taxas de títulos: Publicadas mensalmente

#### 3. Próximos Passos

Com o crescimento previsto da BODIVA (de 4 para 10+ empresas listadas até 2027), espera-se que:

- APIs públicas sejam desenvolvidas
- Infraestrutura de dados melhore significativamente
- IPOs importantes (Sonangol, Unitel, Standard Bank Angola) impulsionem demanda por dados em tempo real

## 📝 Como Atualizar os Dados Manualmente

### Ações da BODIVA

1. Acesse https://www.bodiva.ao
2. Navegue até a seção de mercado/cotações
3. Atualize o arquivo `client/src/components/ProductCards.tsx`:

```typescript
const stocks = [
  { name: "Nome da Empresa", ticker: "TICKER", price: 0000, change: 0.0, sector: "Setor" },
  // ...
];
```

### Títulos do Tesouro

1. Consulte publicações do BNA em http://www.bna.ao
2. Ou acesse https://tradingeconomics.com/angola/interest-rate
3. Atualize o arquivo `client/src/components/ProductCards.tsx`:

```typescript
const bonds = [
  { name: "BT XX dias", rate: 0.0, min: 000000, type: "Tipo" },
  // ...
];
```

## ⚖️ Disclaimer Legal

As informações financeiras apresentadas nesta plataforma são:

- Para fins educacionais e informativos apenas
- Não constituem aconselhamento financeiro
- Podem não refletir valores de mercado em tempo real
- Sujeitas a alterações sem aviso prévio

**Para investimentos reais, consulte sempre uma instituição financeira autorizada pela CMC (Comissão do Mercado de Capitais de Angola).**

## 📚 Referências

- BODIVA - Bolsa de Dívida e Valores de Angola: https://www.bodiva.ao
- Banco Nacional de Angola: http://www.bna.ao
- Ministério das Finanças de Angola: http://www.minfin.gv.ao
- African Capital Markets News: https://africancapitalmarketsnews.com
- Bloomberg Markets
- Trading Economics Angola: https://tradingeconomics.com/angola

---

**Última atualização:** Outubro 2025
**Próxima revisão recomendada:** Mensal ou quando houver novos IPOs/mudanças significativas no mercado
