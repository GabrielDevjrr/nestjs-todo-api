# NESTJS-TODO-API

Uma API REST simples para gerenciamento de tarefas pessoais, desenvolvida como parte de um teste técnico para a posição de Estagiário Desenvolvimento Backend.

## Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

-   **Backend:**
    -   Node.js
    -   NestJS
    -   TypeScript
-   **Banco de Dados:**
    -   Prisma ORM
    -   SQLite (ou PostgreSQL/MySQL, dependendo da sua escolha)
-   **Autenticação:**
    -   JWT (JSON Web Tokens)
-   **Documentação da API:**
    -   Swagger/OpenAPI
-   **Validação de Dados:**
    -   Class-validator

## Setup do Projeto

Siga os passos abaixo para configurar e rodar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [LINK_DO_SEU_REPOSITORIO_GITHUB]
    cd NESTJS-TODO-API
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configuração do Banco de Dados:**
    Este projeto utiliza o Prisma ORM.

    -   **Variáveis de Ambiente:** Crie um arquivo `.env` na raiz do projeto com as suas variáveis de ambiente. Você pode se basear no arquivo `.env.example` fornecido.
        ```
        DATABASE_URL="sqlite:./prisma/dev.db" # Para SQLite. Se for PostgreSQL/MySQL, configure a URL completa.
        JWT_SECRET="sua_chave_secreta_jwt" # Defina uma chave secreta forte para JWT
        ```
    -   **Gerar o Prisma Client e aplicar migrações:**
        ```bash
        npx prisma generate
        npx prisma migrate dev --name initial_migration # ou outro nome para sua migração
        ```
        Este comando irá criar o banco de dados (se não existir) e aplicar o schema definido em `prisma/schema.prisma`.

## Como Executar

Para iniciar o servidor de desenvolvimento:

```bash
npm run start:dev

O servidor estará disponível em http://localhost:3000 (ou na porta configurada nas variáveis de ambiente).

Como Testar a API
A documentação interativa da API está disponível via Swagger:

URL do Swagger: http://localhost:3000/api
Você pode utilizar ferramentas como Postman ou Insomnia para testar os endpoints.

Exemplos de Endpoints:

(Autenticação)

Cadastro de Usuário:
POST /auth/register
Body (JSON):

{
  "name": "João da Silva",
  "email": "usuario@example.com",
  "password": "minhasenha123"
}

Login de Usuário:
POST /auth/login
Body (JSON):

{
  "email": "usuario@example.com",
  "password": "minhasenha123"
}

(Tarefas - Necessita JWT no cabeçalho Authorization: Bearer &lt;token>)

Listar Todas as Tarefas (do usuário logado):
GET /tasks
Listar Tarefas por Status:
GET /tasks?status=completed (ou status=pending)
Criar Tarefa:
POST /tasks
Body (JSON):

{
  "title": "Minha Nova Tarefa",
  "description": "Descrição detalhada da tarefa.",
  "status": "PENDING",
  "dueDate": "2025-12-31T23:59:59Z"
}

Buscar Tarefa por ID:
GET /tasks/:id (Ex: GET /tasks/1)
Atualizar Tarefa:
PATCH /tasks/:id (Ex: PATCH /tasks/1)
Body (JSON): (Envie apenas os campos que deseja atualizar)

{
  "title": "Tarefa Atualizada",
  "status": "COMPLETED"
}

Excluir Tarefa:
DELETE /tasks/:id (Ex: DELETE /tasks/1)
Decisões Técnicas
NestJS com TypeScript: Escolhido pela robustez, modularidade, forte tipagem e excelente suporte a padrões de projeto (Módulos, Controllers, Services, DTOs, Guards, Decorators). Facilita a escalabilidade e manutenção do código.
Prisma ORM: Selecionado pela facilidade de uso, tipagem forte, migrações automatizadas e geração de cliente, que acelera o desenvolvimento e reduz erros de digitação ao interagir com o banco de dados.
DTOs (Data Transfer Objects): Utilizados para definir a estrutura dos dados esperados nas requisições, garantindo validação robusta e separação de responsabilidades (evita expor o modelo do banco de dados diretamente).
JWT (JSON Web Tokens): Implementado para autenticação stateless, garantindo segurança e escalabilidade nas requisições.
Guards e Decorators Customizados: Usados para proteger rotas e extrair informações do usuário autenticado de forma declarativa e reutilizável, seguindo as melhores práticas do NestJS.
Tratamento de Erros: Exceções do NestJS (NotFoundException, UnauthorizedException) são utilizadas para um tratamento de erros consistente e retorno de respostas HTTP adequadas.
Melhorias Futuras
Com mais tempo, as seguintes melhorias poderiam ser implementadas:

Testes Unitários e de Integração: Adicionar cobertura de testes abrangente para controllers, services e módulos.
Logs Estruturados: Implementar um sistema de log mais robusto (ex: com Winston ou Pino) para facilitar o monitoramento e depuração em ambiente de produção.
Soft Delete: Em vez de exclusão física, marcar tarefas como "deletadas" no banco de dados para permitir recuperação futura.
Paginação e Ordenação: Implementar opções de paginação e ordenação nas listagens de tarefas para lidar com grandes volumes de dados.
Tratamento de Erros Global: Um filtro de exceções global para padronizar todas as respostas de erro da API.
Dockerização: Criar um Dockerfile e docker-compose.yml para facilitar a implantação em ambientes conteinerizados.