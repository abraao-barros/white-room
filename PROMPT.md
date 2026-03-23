# 🎯 OBJETIVO GERAL

Realizar melhorias de UI, UX, estrutura de formulário, lógica de persistência e fluxo de aprovação no sistema de orçamentos.

---

# 🧩 1. UI / DESIGN

## 1.1 BudgetInvestment.tsx

- Ajustar o design do componente `BudgetInvestment.tsx` para se assemelhar ao layout da imagem fornecida.
- Melhorar hierarquia visual (tipografia, espaçamentos, cores, destaques de valores).
- Garantir responsividade (mobile-first).
- Destacar claramente:
  - Nome do plano / pacote
  - Valor
  - Benefícios incluídos
  - Call-to-action visual (mesmo antes do CTA funcional)

---

## 1.2 Campo "Sobre a Empresa"

- Adicionar uma nova seção reutilizável:
  - Título (input simples)
  - Descrição (textarea)

- Essa seção deve aparecer no fluxo do orçamento e ser persistida no banco.

---

# 🧱 2. FORMULÁRIO (BudgetForm.tsx)

## 2.1 Campo "Processo de Trabalho" (REPETIDOR)

Criar um novo campo no `BudgetForm.tsx` seguindo o padrão do campo de entregáveis:

Cada item do repetidor deve conter:

- Ícone (seleção via picker ou input de nome/classe de ícone)
- Título
- Descrição

Funcionalidade:

- Botão "Adicionar processo"
- Ao clicar, adiciona novo item abaixo (array dinâmico)
- Permitir remover itens
- Persistir como array no banco

---

## 2.2 Aba "Termos de Pagamento"

Adicionar uma nova seção abaixo de "Cronograma e Valores":

Campos:

- Texto livre (textarea ou repetidor opcional)
- Exemplos:
  - 50% inicial + 50% final
  - 100% antecipado com desconto
  - Parcelado

Renderização:

- Exibir isso na proposta final
- Adicionar um **badge visual fixo** informando:
  👉 "50% de entrada obrigatório para início (kick-off)"

---

# ⚙️ 3. BACKEND / API

## 3.1 Aprovação de Proposta

Criar endpoint:
POST /budgets/:id/approve

Regras:

- Salvar:
  - budgetId
  - userId
  - status: "approved"
  - approvedAt

- Um orçamento só pode ser aprovado UMA única vez
- Se já aprovado → retornar erro

---

## 3.2 Atualização do Schema

Adicionar no model de budgets:

- approved: boolean (default: false)
- approvedAt: datetime (nullable)

---

## 3.3 CTA após BudgetInvestment

Adicionar dois botões:

- "Aprovar proposta"
  - Chama endpoint POST /approve

- "Agendar call"
  - Pode ser link externo ou ação futura

---

# 🔁 4. CORREÇÃO DE PERSISTÊNCIA (IMPORTANTE)

## Problema atual:

- Sempre cria um novo orçamento ao salvar

## Correção:

- Se existir `id` → fazer PATCH (update)
- Se NÃO existir → fazer POST (create)

⚠️ CUIDADO:

- Não quebrar a lógica atual
- Garantir compatibilidade com criação existente
- Validar fluxo de edição vs criação

---

# 📊 5. DASHBOARD DE STATUS

## 5.1 Sidebar

- Adicionar nova aba:
  "Status de Orçamentos"

## 5.2 Página de Status

Criar página com listagem:

Campos exibidos:

- Nome do orçamento
- Cliente
- Status (Aprovado / Pendente)
- Data de criação
- Data de aprovação (se houver)

Extras:

- Badge visual:
  - Verde → aprovado
  - Cinza/amarelo → pendente

---

# 🧠 REGRAS GERAIS

- Seguir padrão atual do projeto (componentização e estilo)
- Reutilizar lógica existente sempre que possível
- Evitar duplicação de código
- Garantir tipagem correta (TypeScript)
- Validar estados de loading e erro nas ações

---

# 🚨 IMPORTANTE

- NÃO alterar funcionalidades existentes sem necessidade
- NÃO quebrar compatibilidade com dados atuais
- Implementar de forma incremental e segura

---
