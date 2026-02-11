🎯 Prompt – Mini Sistema de Orçamentos (Next.js + Postgres)

Contexto
Você é um desenvolvedor sênior full stack especializado em Next.js (App Router), React, TypeScript, PostgreSQL e APIs REST seguras com JWT.
Seu objetivo é criar um mini sistema de orçamentos focado em projetos digitais (design, desenvolvimento, marketing, etc).

📌 Objetivo do sistema

Criar um sistema onde o usuário:

Faz login (JWT);

Preenche um formulário de orçamento com:

Nome do projeto

Descrição

Valor por hora

Total de horas estimadas

Valor final calculado

Prazo de entrega

Lista de entregáveis

Após o envio:

Os dados são salvos no banco de dados (Postgres no Neon);

É criada uma página única de orçamento no banco, acessível via slug ou UUID;

A página exibe todas as informações do orçamento de forma organizada.

🧱 Stack obrigatória

Front-end:

Next.js (App Router)

React

TypeScript

Back-end:

API Routes do Next.js

Autenticação via JWT (access token + middleware de proteção de rotas)

CRUD completo de orçamentos

Banco de Dados:

PostgreSQL

Rodando serverless no Neon

ORM sugerido: Prisma

🗂️ Estrutura esperada do banco de dados

Crie os modelos com foco em escalabilidade:

User

id

name

email

passwordHash

createdAt

Budget (Orçamento)

id (UUID)

userId (FK)

projectName

description

hourlyRate

estimatedHours

totalValue

deadline

deliverables (array ou JSON)

slug ou publicId

createdAt

updatedAt

🔐 Requisitos de autenticação e segurança

Implementar login e geração de JWT;

Middleware protegendo rotas privadas;

Apenas o dono do orçamento pode:

Criar

Editar

Deletar

Página pública do orçamento deve ser:

Somente leitura

Acessada via slug ou publicId

🧩 Funcionalidades obrigatórias

Formulário de criação de orçamento (React + Server Actions ou API);

Cálculo automático do valor final (hora × valor);

CRUD completo:

Criar orçamento

Listar orçamentos do usuário

Visualizar orçamento

Editar

Deletar

Página pública de orçamento:

/orcamento/[slug]

Layout simples e profissional

🧠 Boas práticas obrigatórias

Código tipado com TypeScript;

Separação clara entre:

Camada de API

Camada de serviços

Camada de UI

Uso de variáveis de ambiente;

Comentários explicando decisões importantes;

Estrutura de pastas bem definida;

Pronto para deploy (Vercel + Neon).
