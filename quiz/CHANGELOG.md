# Integração Frontend-Backend - Resumo das Alterações

## 📁 Arquivos Criados

### `/src/data/repositories/api-repository.ts`

- **Novo repositório principal** para comunicação com o backend
- Implementa todas as chamadas para a API do Fastify
- Inclui tratamento de erros e tipagem completa
- Métodos:
  - `createUser()` - Cria usuário no backend
  - `getRandomQuestions()` - Busca 10 perguntas aleatórias
  - `answerQuestion()` - Envia resposta e recebe feedback
  - `getAllUsers()` - Busca todos os usuários para ranking

### `/quiz/.env.local`

- Configuração da URL da API para o frontend

### `/quiz/README-INTEGRATION.md`

- Documentação completa da integração

## 🔧 Arquivos Modificados

### Interfaces (`/src/domain/interfaces/`)

#### `question.ts`

- Alterou `selectedAnswer` de `number` para `string`
- Removeu `correctAnswer: number` (não é enviado pelo backend)
- Adicionou campos para feedback: `isAnswered`, `isCorrect`, `correctAnswer`, `pointsEarned`

#### `player.ts`

- Alterou de `score: number` para `points: number`
- Alterou de `completedAt: Date` para `createdAt/updatedAt: string`
- Agora reflete exatamente a estrutura do backend

#### `ranking.ts`

- Alterou de `playerName/playerUsername` para `name/username`
- Alterou de `score` para `points`
- Sincronizado com interface do backend

#### `quiz.ts`

- Adicionou `playerId?: string` para armazenar ID do usuário
- Adicionou `isLoading?: boolean` e `error?: string` para estados

### Store (`/src/data/stores/quiz-store.ts`)

- Atualizou para trabalhar com strings em vez de números nas respostas
- Adicionou métodos para controle de loading e erros
- Adicionou `updateQuestionResult()` para feedback das respostas
- Método `incrementScore()` agora aceita quantidade de pontos

### Hooks

#### `/src/hooks/use-quiz-actions.ts`

- **Reescrito completamente** para integração com backend
- `startQuiz()` agora cria usuário e busca perguntas da API
- `selectAnswer()` envia resposta para backend e processa feedback
- Removida lógica local de verificação (agora é feita pelo backend)
- Adicionado tratamento completo de erros e loading

#### `/src/hooks/use-ranking.ts`

- Reescrito para usar `apiRepository` em vez de mock
- Implementa ordenação por pontos e data
- Adicionado método `refetch()` para atualizar ranking

### Componentes

#### `/src/presentation/app/quiz/page.tsx`

- Adicionado tratamento de estados de loading e erro
- Atualizado para passar novos props para componentes filhos

#### `/src/presentation/app/quiz/components/quiz-feedback.tsx`

- Interface atualizada para trabalhar com strings
- Adicionados props `selectedAnswer` e `pointsEarned`
- Exibe pontos ganhos e feedback mais detalhado
- Aumentado tempo de exibição para 3 segundos

#### `/src/presentation/app/quiz/components/quiz-options.tsx`

- Mudou de índices numéricos para strings nas opções
- Adicionado estado de loading nos botões
- Desabilita botões durante envio da resposta

#### `/src/presentation/app/results/page.tsx`

- Adicionado cálculo de estatísticas (corretas/incorretas/porcentagem)
- Passa `currentPlayerId` para destacar jogador no ranking

#### `/src/presentation/app/results/components/results-score.tsx`

- Interface expandida com mais estatísticas
- Layout melhorado com grid de informações
- Mostra pontos totais, porcentagem de acertos, etc.

#### `/src/presentation/app/results/components/results-ranking.tsx`

- Adicionado tratamento de erro e loading
- Destaca o jogador atual no ranking
- Funciona com dados reais do backend

#### `/src/presentation/app/home/components/home-form.tsx`

- Removida validação de username duplicado (feita pelo backend)
- Adicionado feedback de loading durante criação do usuário
- Exibe erros retornados pelo backend

### Configuração

#### `/quiz/next.config.js`

- Configurado proxy para API calls
- Definida URL padrão do backend

## 🗑️ Arquivos Removidos

- `/src/data/repositories/quiz-repository.ts` - Repositório com dados mockados
- `/src/data/repositories/user-repository.ts` - Repositório mock de usuários

## 🎯 Principais Mudanças Funcionais

1. **Autenticação**: Usuário é criado no backend antes do quiz iniciar
2. **Perguntas**: Buscadas dinamicamente do banco de dados via API
3. **Respostas**: Enviadas individualmente para o backend com feedback imediato
4. **Pontuação**: Gerenciada pelo backend (5 pontos por resposta correta)
5. **Ranking**: Buscado em tempo real do banco de dados
6. **Estados**: Loading e error states em toda a aplicação
7. **Feedback**: Resposta correta e pontos ganhos exibidos para cada pergunta

## 🔄 Fluxo de Dados Completo

1. **Home**: Usuário preenche formulário → POST /user (cria usuário)
2. **Quiz Init**: GET /questions/random (busca 10 perguntas)
3. **Cada resposta**: POST /questions/answer (envia resposta + recebe feedback)
4. **Resultado**: GET /user (busca ranking atualizado)

Todas as mudanças mantêm a funcionalidade original mas agora com integração completa ao backend Fastify.
