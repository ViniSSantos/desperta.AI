# 🧠 Desperta.AI

> Um sistema de alarme inteligente que une **Node.js**, **TypeORM**, **PostgreSQL**, **MongoDB** e **Docker** para entregar notificações personalizadas com persistência híbrida.

![Docker](https://img.shields.io/badge/docker-ready-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

---

## 🚀 Sobre o projeto

O **Desperta.AI** é uma API robusta para gerenciamento de alarmes inteligentes com:

- Autenticação de usuários
- Histórico de ativações
- Alarmes recorrentes com dias da semana
- Frases motivacionais armazenadas em **MongoDB**
- Backend 100% dockerizado e com suporte a múltiplos bancos de dados

---

## 📦 Tecnologias utilizadas

- **Node.js + TypeScript**
- **Express**
- **TypeORM**
- **PostgreSQL** (entidades relacionais)
- **MongoDB** (dados não estruturados)
- **Docker + Docker Compose**
- **DotEnv** (para variáveis de ambiente)
- **Jest** (para testes futuros 🚧)

---

## 🧪 Como rodar localmente (modo dev)

> Pré-requisitos: Docker e Docker Compose instalados.

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/desperta-ai.git
cd desperta-ai

# Crie o arquivo .env baseado no exemplo
cp .env.example .env
