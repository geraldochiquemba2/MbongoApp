# 🚀 Deploy no Render - Guia Completo

Este guia explica como fazer o deploy gratuito da sua aplicação no Render e manter ela ativa 24/7.

## 📋 Pré-requisitos

1. Conta no GitHub
2. Conta no Render (gratuita) - [render.com](https://render.com)
3. Código enviado para um repositório GitHub

## 🔧 Configuração Automática

A aplicação já está configurada com:

- ✅ Endpoint `/api/health` para monitoramento
- ✅ `render.yaml` com configurações de deploy
- ✅ Keep-alive automático a cada 10 minutos (em produção)
- ✅ Scripts de build e start otimizados

## 📦 Passo a Passo do Deploy

### 1. Enviar código para o GitHub

```bash
git init
git add .
git commit -m "Deploy inicial"
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
git push -u origin main
```

### 2. Conectar ao Render

1. Acesse [render.com](https://render.com) e faça login
2. Clique em **"New +"** → **"Web Service"**
3. Conecte sua conta do GitHub
4. Selecione seu repositório

### 3. Configurar o Serviço

O Render irá detectar automaticamente o arquivo `render.yaml`, mas você também pode configurar manualmente:

| Campo | Valor |
|-------|-------|
| **Name** | financial-app-angola (ou seu nome preferido) |
| **Region** | Frankfurt (ou mais próximo de você) |
| **Branch** | main |
| **Runtime** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | **Free** |

### 4. Adicionar Variáveis de Ambiente

Na seção **Environment**, adicione:

```
NODE_ENV=production
GROQ_API_KEY=sua_chave_aqui
```

> ⚠️ **Importante**: Você precisa ter uma chave da API Groq. Obtenha em [console.groq.com](https://console.groq.com)

### 5. Fazer Deploy

1. Clique em **"Create Web Service"**
2. Aguarde 3-10 minutos para o build completar
3. Sua aplicação estará disponível em: `https://seu-app.onrender.com`

## 🔄 Keep-Alive Automático

### Método 1: Keep-Alive Interno (Já Configurado) ✅

A aplicação já possui um sistema de keep-alive interno que:
- Roda apenas em produção no Render
- Faz ping no endpoint `/api/health` a cada 10 minutos
- Evita que o app durma após 15 minutos de inatividade

**Como funciona:**
- Usa `node-cron` para agendar pings automáticos
- Detecta automaticamente se está no Render via variáveis de ambiente
- Registra cada ping nos logs do Render

### Método 2: UptimeRobot (Recomendado para Redundância) 🌐

Para maior confiabilidade, use também o UptimeRobot:

1. Acesse [uptimerobot.com](https://uptimerobot.com)
2. Crie uma conta gratuita
3. Clique em **"Add New Monitor"**
4. Configure:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: Financial App Angola
   - **URL**: `https://seu-app.onrender.com/api/health`
   - **Monitoring Interval**: 5 minutos (plano grátis)
5. Clique em **"Create Monitor"**

**Benefícios do UptimeRobot:**
- ✅ Monitoring externo (funciona mesmo se o app desligar)
- ✅ Alertas por email se o app cair
- ✅ Histórico de uptime
- ✅ Totalmente gratuito

### Método 3: Cron-Job.org (Alternativa)

1. Acesse [console.cron-job.org](https://console.cron-job.org)
2. Crie uma conta
3. Crie um novo cron job:
   - **URL**: `https://seu-app.onrender.com/api/health`
   - **Schedule**: A cada 10 minutos (`*/10 * * * *`)
4. Ative o job

## 📊 Limites do Plano Gratuito

- **750 horas/mês** (suficiente para 24/7 com keep-alive)
- **100 GB de bandwidth/mês**
- App "dorme" após 15 minutos sem atividade (resolvido com keep-alive)
- Cold start de ~30-60 segundos quando acordar

## 🔍 Verificar Status

### Verificar se o keep-alive está funcionando:

1. Acesse os logs no Dashboard do Render
2. Procure por mensagens: `[Keep-Alive] ✓ Self-ping successful`
3. Deve aparecer a cada 10 minutos

### Testar o endpoint de health:

```bash
curl https://seu-app.onrender.com/api/health
```

Resposta esperada:
```json
{
  "status": "OK",
  "timestamp": "2025-10-15T10:30:00.000Z",
  "uptime": 1234.56
}
```

## 🚨 Troubleshooting

### Build Falha
- Verifique se todas as dependências estão no `package.json`
- Confirme que o Node.js está na versão correta

### App não inicia
- Verifique se a variável `GROQ_API_KEY` está configurada
- Confirme que o comando de start está correto: `npm start`

### Keep-alive não funciona
- Verifique se `NODE_ENV=production` está configurado
- Confirme nos logs se o cron job iniciou
- Use UptimeRobot como backup

### App ainda dorme
- Verifique se o UptimeRobot está ativo e funcionando
- Confirme que o intervalo está em 5-10 minutos
- Verifique se você não excedeu as 750 horas/mês

## 🔄 Deploy Automático

Após a configuração inicial, toda vez que você fizer `git push` para a branch `main`, o Render fará deploy automático da nova versão.

```bash
git add .
git commit -m "Nova funcionalidade"
git push
```

## 💰 Upgrade (Opcional)

Se precisar de recursos adicionais:

| Plano | Preço | Benefícios |
|-------|-------|-----------|
| **Free** | $0/mês | Ideal para testes |
| **Starter** | $7/mês | Sem sleep, builds mais rápidos |
| **Standard** | $25/mês | Mais CPU/RAM, IP estático |

## 📚 Recursos Adicionais

- [Documentação Render](https://render.com/docs)
- [Render Free Tier](https://render.com/docs/free)
- [UptimeRobot Docs](https://uptimerobot.com/faq/)

## ✅ Checklist Final

- [ ] Código enviado para GitHub
- [ ] Serviço criado no Render
- [ ] Variáveis de ambiente configuradas (GROQ_API_KEY)
- [ ] Deploy completado com sucesso
- [ ] App acessível via URL do Render
- [ ] Keep-alive interno funcionando (verificar logs)
- [ ] UptimeRobot configurado (opcional mas recomendado)
- [ ] Endpoint `/api/health` respondendo corretamente

---

🎉 **Parabéns!** Sua aplicação está no ar 24/7 gratuitamente!
