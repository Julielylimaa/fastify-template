# 🎯 Como Executar o Projeto - SuriQuiz

## 📋 Pré-requisitos

1. **Node.js** (versão 16 ou superior)
2. **PostgreSQL** rodando na porta 5432
3. **Docker** (opcional, para PostgreSQL)

## 🗄️ Configuração do Banco de Dados

### Opção 1: Usar Docker (Recomendado)

```bash
# Na pasta raiz do projeto
docker-compose up -d postgres-db
```

### Opção 2: PostgreSQL Local

Certifique-se de que o PostgreSQL está rodando com:

- **Host:** localhost
- **Porta:** 5432
- **Database:** fastify-ignite
- **User:** postgres
- **Password:** strongPassword

## 🚀 Executando o Projeto

### 1. **Backend (Porta 3000)**

```bash
# Na pasta raiz do projeto
cd /Users/julielylima/Documents/Scoder/scoder-academy/desafio/fastify-template

# Instalar dependências
npm install

# Rodar migrations do banco
npm run migrate

# Popular banco com dados de exemplo (questões)
npm run seed

# Iniciar o servidor backend
npm run dev
```

O backend estará disponível em: **http://localhost:3000**

### 2. **Frontend (Porta 3001)**

```bash
# Em outro terminal, na pasta quiz
cd /Users/julielylima/Documents/Scoder/scoder-academy/desafio/fastify-template/quiz

# Instalar dependências
npm install

# Iniciar o frontend
npm run dev
```

O frontend estará disponível em: **http://localhost:3001**

## 🔗 Testando a Integração

### Via cURL (Backend)

```bash
# Buscar usuários
curl -X GET http://localhost:3000/user

# Criar usuário
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva", "username": "joao123"}'

# Buscar perguntas aleatórias
curl -X GET http://localhost:3000/questions/random?quantity=3

# Responder pergunta
curl -X POST http://localhost:3000/questions/answer \
  -H "Content-Type: application/json" \
  -d '{"userId": "UUID_DO_USUARIO", "questionId": "UUID_DA_PERGUNTA", "selectedOption": "OPCAO_ESCOLHIDA"}'
```

### Via Frontend (Navegador)

1. Acesse **http://localhost:3001**
2. Preencha o formulário com nome e username
3. Clique em "Start Quiz"
4. Responda as 10 perguntas
5. Veja seu resultado e ranking

## 🐛 Solução de Problemas

### Erro de Conexão com Backend

```bash
# Verificar se o backend está rodando
curl http://localhost:3000/user

# Se retornar erro, reiniciar backend
cd /Users/julielylima/Documents/Scoder/scoder-academy/desafio/fastify-template
npm run dev
```

### Erro de Banco de Dados

```bash
# Resetar banco e migrations
npm run migrate

# Popular novamente
npm run seed
```

### Conflito de Portas

```bash
# Verificar processos usando as portas
lsof -i :3000  # Backend
lsof -i :3001  # Frontend

# Matar processos se necessário
kill PID_DO_PROCESSO
```

### Erro de CORS

O backend já está configurado para aceitar requisições do frontend. Se ainda assim houver erro, verificar:

1. Backend rodando na porta 3000
2. Frontend rodando na porta 3001
3. Variável `NEXT_PUBLIC_API_URL=http://localhost:3000` em `quiz/.env.local`

## 📊 Estrutura das URLs

### Backend (http://localhost:3000)

- `GET /user` - Lista todos os usuários
- `POST /user` - Cria usuário
- `GET /questions/random` - Busca perguntas aleatórias
- `POST /questions/answer` - Envia resposta

### Frontend (http://localhost:3001)

- `/` - Página inicial do quiz
- Interface completa do quiz integrada

## ✅ Verificação de Sucesso

1. **Backend funcionando:** Acesse http://localhost:3000/user e veja JSON com usuários
2. **Frontend funcionando:** Acesse http://localhost:3001 e veja a tela inicial
3. **Integração funcionando:** Crie um usuário no frontend e veja se aparece no ranking

## 🎮 Como Jogar

1. **Tela Inicial:** Digite nome completo e username único
2. **Quiz:** Responda 10 perguntas em sequência
3. **Feedback:** Veja se acertou e quantos pontos ganhou
4. **Resultado:** Veja sua pontuação final e posição no ranking
5. **Ranking:** Compare sua performance com outros jogadores

## 🔧 Configurações Avançadas

### Mudar Porta do Backend

Edite `src/index.ts` linha do `server.listen()` para usar outra porta.

### Mudar Porta do Frontend

Edite `quiz/package.json` no script `dev` para `-p NOVA_PORTA`.

### Configurar Banco Diferente

Edite `.env` na raiz e altere `PG_CONNECTION_STRING`.

---

**🎯 Tudo pronto! O SuriQuiz está funcionando com integração completa entre frontend e backend.**
