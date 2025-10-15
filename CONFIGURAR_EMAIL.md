# 📧 Como Configurar Email para Enviar para Qualquer Destinatário

## ⚠️ Importante: Limitação Atual

Atualmente, usando `onboarding@resend.dev`, você **só pode enviar emails para endereços que verificou manualmente** na sua conta Resend. Isso acontece porque:

- `onboarding@resend.dev` é um email de **teste/demonstração**
- O Resend exige verificação de domínio para envios em produção
- **Nem a integração nativa do Replit elimina essa necessidade**

## ✅ Solução: Verificar Seu Próprio Domínio

Para enviar emails para **QUALQUER pessoa**, siga estes passos:

---

## Passo 1: Ter um Domínio

Você precisa de um domínio próprio. Opções:

- **Se já tem um domínio**: Use ele (ex: `mbongo.com`, `seusite.ao`)
- **Se não tem**: Registre um em:
  - [Namecheap](https://www.namecheap.com) (~$10/ano)
  - [Google Domains](https://domains.google)
  - [Cloudflare](https://www.cloudflare.com/products/registrar/) (preço de custo)

**Dica:** Você pode usar um **subdomínio** como `email.seusite.com` para separar o envio de emails.

---

## Passo 2: Criar Conta no Resend (Grátis)

1. Acesse: https://resend.com/signup
2. Crie uma conta gratuita
3. Faça login

**Plano Gratuito:**
- ✅ 3.000 emails/mês
- ✅ 100 emails/dia
- ✅ 1 domínio verificado

---

## Passo 3: Adicionar e Verificar Domínio

### 3.1. Adicionar Domínio

1. No dashboard do Resend, clique em **"Domains"** (menu lateral)
2. Clique no botão **"Add Domain"**
3. Digite seu domínio (ou subdomínio):
   - Domínio completo: `mbongo.com`
   - Ou subdomínio: `email.mbongo.com`
4. Clique em **"Add"**

### 3.2. Configurar Registros DNS

O Resend mostrará os registros DNS que você precisa adicionar. Exemplo:

| Tipo | Nome | Valor |
|------|------|-------|
| **TXT** | `resend._domainkey` | `p=MIGfMA0GCS...` (chave DKIM) |
| **TXT** | `@` | `v=spf1 include:amazonses.com ~all` (SPF) |

### 3.3. Adicionar Registros no seu Provedor de Domínio

**Se seu domínio está no Namecheap:**
1. Faça login no Namecheap
2. Vá em **Domain List** → Clique em **Manage**
3. Vá em **Advanced DNS**
4. Clique em **Add New Record**
5. Adicione cada registro TXT fornecido pelo Resend

**Se seu domínio está no Cloudflare:**
1. Faça login no Cloudflare
2. Selecione seu domínio
3. Vá em **DNS** → **Records**
4. Clique em **Add record**
5. Adicione cada registro TXT fornecido pelo Resend

**Se seu domínio está em outro provedor:**
- Procure por "DNS Settings" ou "Advanced DNS"
- Adicione os registros TXT fornecidos pelo Resend

### 3.4. Verificar no Resend

1. Volte ao dashboard do Resend
2. Clique em **"Verify DNS Records"**
3. Aguarde (pode levar de 5 minutos a 72 horas)

Quando verificado, você verá um ✅ verde ao lado do domínio!

---

## Passo 4: Obter API Key

1. No Resend, vá em **"API Keys"** (menu lateral)
2. Clique em **"Create API Key"**
3. Dê um nome: `Mbongo Production`
4. Selecione permissão: **"Sending access"**
5. Clique em **"Add"**
6. **COPIE A CHAVE** (ela só aparece uma vez!)

A chave começa com `re_...`

---

## Passo 5: Configurar no Replit

### 5.1. Adicionar API Key (já feito ✅)

Você já forneceu a `RESEND_API_KEY`, então essa parte está completa!

### 5.2. Configurar Email de Envio

Agora você precisa adicionar a variável `FROM_EMAIL`:

1. No Replit, clique em **"Secrets"** (ícone de cadeado no painel lateral)
2. Clique em **"Add Secret"**
3. **Key**: `FROM_EMAIL`
4. **Value**: `Nome da Empresa <email@seudominio.com>`
   - Exemplo: `Mbongo <contato@mbongo.com>`
   - Ou: `+Mbongo <noreply@mbongo.com>`
5. Clique em **"Add Secret"**

**Importante:** Use o domínio que você verificou no Passo 3!

---

## Passo 6: Testar!

Após configurar tudo:

1. Vá na sua aplicação
2. Tente se inscrever na newsletter com **QUALQUER email**
3. Verifique a caixa de entrada

**Agora funciona para qualquer email! 🎉**

---

## 🔍 Solução de Problemas

### Email vai para SPAM

**Soluções:**
- Adicione registro **DMARC** no DNS (opcional mas recomendado):
  ```
  Tipo: TXT
  Nome: _dmarc
  Valor: v=DMARC1; p=none; rua=mailto:dmarc@seudominio.com
  ```
- Use um subdomínio dedicado (ex: `email.mbongo.com`)
- Adicione um link de unsubscribe nos emails

### DNS não verifica

**Causas comuns:**
- Aguarde até 72 horas
- Certifique-se de adicionar os registros **exatamente** como mostrado
- Verifique se não há espaços extras nos valores
- Alguns provedores precisam que você remova as aspas dos valores TXT

### "Domain not verified" error

Você ainda está usando `onboarding@resend.dev`. Certifique-se de:
1. Verificar o domínio no Resend (Passo 3)
2. Adicionar a variável `FROM_EMAIL` nos Secrets (Passo 5.2)
3. Reiniciar a aplicação

---

## 📊 Resumo Rápido

| Etapa | Status | Ação |
|-------|--------|------|
| ✅ Ter domínio próprio | - | Registrar em Namecheap/Cloudflare |
| ✅ Criar conta Resend | - | https://resend.com/signup |
| ✅ Adicionar domínio no Resend | - | Dashboard → Domains → Add |
| ✅ Configurar DNS | - | Adicionar registros TXT no provedor |
| ✅ Verificar domínio | - | Aguardar verificação (5min-72h) |
| ✅ Obter API Key | ✅ Feito | Já configurado |
| ✅ Adicionar FROM_EMAIL | - | Secrets → Add → `FROM_EMAIL` |
| ✅ Testar emails | - | Inscrever newsletter |

---

## 💡 Alternativa: Usar Email Temporariamente

Se você não tem um domínio ainda, pode temporariamente:

1. Adicionar emails de teste manualmente no Resend:
   - Dashboard → Settings → Email Addresses
   - Adicionar os emails que você quer testar
   - Confirmar no email

Mas isso **não é recomendado para produção**. Você precisará do domínio verificado eventualmente.

---

## 📚 Recursos Úteis

- **Resend Dashboard**: https://resend.com/dashboard
- **Documentação Resend**: https://resend.com/docs
- **Guias DNS por Provedor**: https://resend.com/docs/dashboard/domains/providers
- **Status de Entrega**: https://resend.com/emails (ver emails enviados)

---

**Dúvidas?** Se precisar de ajuda com qualquer passo, é só me avisar! 🚀
