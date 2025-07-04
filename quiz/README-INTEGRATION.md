# Quiz Frontend - Backend Integration

Este projeto implementa a integração completa entre o frontend (Next.js) e o backend (Fastify) do quiz.

## Funcionalidades Implementadas

### 🎯 Frontend Features

- **Formulário de cadastro**: Coleta nome e username do jogador
- **Integração com API**: Cria usuário no backend antes de iniciar o quiz
- **Quiz interativo**: Busca 10 perguntas aleatórias do backend
- **Envio de respostas**: Envia cada resposta para o backend e recebe feedback
- **Sistema de pontuação**: Mostra pontos ganhos e total em tempo real
- **Ranking**: Exibe ranking de todos os usuários ordenado por pontos
- **Estados de loading**: Indicadores visuais durante requisições
- **Tratamento de erros**: Exibe mensagens de erro para falhas na API

### 🔗 Backend Integration

- **POST /user**: Cria novo usuário
- **GET /questions/random**: Busca 10 perguntas aleatórias
- **POST /questions/answer**: Envia resposta e recebe feedback
- **GET /user**: Busca todos os usuários para o ranking

### 📱 User Experience

- **Feedback visual**: Mostra se a resposta está correta/incorreta
- **Pontuação em tempo real**: Atualiza pontos conforme as respostas
- **Identificação no ranking**: Destaca o jogador atual no ranking
- **Estados de carregamento**: Spinners e mensagens de loading
- **Tratamento de erros**: Mensagens amigáveis para problemas

## Como Executar

### Backend (Fastify)

```bash
# Na pasta raiz do projeto
npm install
npm run dev
```

O backend estará disponível em `http://localhost:3000`

### Frontend (Next.js)

```bash
# Na pasta quiz
cd quiz
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:3001`

## Fluxo de Dados

1. **Cadastro**: Usuário preenche nome e username
2. **Criação**: Frontend cria usuário no backend via POST /user
3. **Perguntas**: Frontend busca 10 perguntas via GET /questions/random
4. **Quiz**: Para cada resposta:
   - Frontend envia resposta via POST /questions/answer
   - Backend retorna se está correto + pontos ganhos + total de pontos
   - Frontend mostra feedback e atualiza pontuação
5. **Ranking**: Frontend busca todos os usuários via GET /user e ordena por pontos

## Estrutura de Dados

### User (Backend)

```typescript
{
  id: string;
  name: string;
  username: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}
```

### Question (Backend)

```typescript
{
  id: string;
  question: string;
  options: string[];
}
```

### Answer Request

```typescript
{
  userId: string;
  questionId: string;
  selectedOption: string;
}
```

### Answer Response

```typescript
{
  correct: boolean;
  correctAnswer: string;
  pointsEarned: number;
  totalPoints: number;
  message: string;
}
```

## Configuração

### Environment Variables

Crie um arquivo `.env.local` na pasta `quiz`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### API Configuration

O frontend está configurado para conectar com o backend na porta 3000 por padrão.

## Features Detalhadas

### Sistema de Pontuação

- Cada resposta correta vale 5 pontos
- Pontuação é atualizada em tempo real
- Total de pontos é persistido no backend

### Ranking

- Ordenado por pontos (decrescente)
- Em caso de empate, ordena por data de criação (crescente)
- Destaca o jogador atual com cor diferente
- Mostra top 10 jogadores

### Tratamento de Erros

- Erros de rede são capturados e exibidos
- Estados de loading impedem múltiplas submissões
- Mensagens de erro amigáveis para o usuário
- Botão de "Try Again" em caso de erro

### Estados da Aplicação

- **Home**: Formulário de cadastro
- **Quiz**: Perguntas e respostas
- **Results**: Pontuação final e ranking

Todas as alterações foram feitas APENAS na pasta `quiz` (frontend), conforme solicitado. O backend permaneceu inalterado.
