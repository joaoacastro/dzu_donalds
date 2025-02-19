## Extensões do VSCode para auxiliar neste projeto:
### Estilo:
- poimandres (tema do VSCode)
- symbol icons (icones dos arquivos)

### Desempenho:
- Prettier - Code formatter
    
        Settings/Default Formatter
        Colocar o Prettier - Code Formatter como Formatador Padrão

        Format On Save
        Selecionar a primeira caixa de seleção

- ESLint
- Prisma
- PostCSS Language Support
- Tailwind CSS IntelliSense
- GitLens - Git supercharged
- GitHub Copilot
- Simple React Snippets

## Framework utilizado nesse projeto:
- NEXT.js, Tailwind, Shadcn

## Banco de dados
Banco relacional: PostgreSQL

### criando o app
npx create-next-app@15.1.6 fullstackweek

### instalando o Prisma
npm install prisma@6.2.1
npm install @prisma/client@6.2.1

para inicializar o prisma
npx prisma init

Vamos colocar dentro do schema.prisma nossas tabelas do diagrama

Depois de incluir todas as tabelas no schema.prisma, usamos o comando npx prisma format, para formatar nossa tabela

Para criar essas tabelas em um banco de dados postgres vamos utilizar o Neondb

para linkar a tabela com o banco de dados que acabos de criar, utilizamos o seguinte comando
npx prisma migrate dev

instalar o ts-node
npm install -D ts-node@10.9.2
alterar o arquivo package.json
incluir o seguinte após scripts

  "prisma": {
    "seed":"ts-node ./prisma/seed.ts"
  }

depois para rodar o prisma, utilizamos o seguinte comando
npx prisma db seed

_________________________________

Qualquer pasta criada dentro da pasta `app` (localizada dentro de `src`) que contenha um arquivo `page.tsx` será tratada como uma rota. O nome da pasta se tornará a rota correspondente. Por exemplo, se houver um arquivo no caminho `src/app/products/page.tsx`, a rota no navegador será `localhost:3000/products`.
_________________________________

atalho sfc para criar uma const no page.tsx

_________________________________

## shadcn
instalamos o shadcn com o seguinte comando
npx shadcn@2.3.0 init

neste projeto vamos inserir um botão do shadcn, para isso utilizamos o seguinte comando
npx shadcn@2.3.0 add button
_________________________________

os valores padrões do Tailwind ficam no caminho .\src\app\globals.css
Tudo o que vc quiser que seja global no projeto, colocar no layout.tsx, pois vai aparecer em todas as paginas automaticamente.
_________________________________


### Rodar o projeto
- NPM RUN DEV

# Diagrama
 
### 1.OrderProduct

1.1 - id: string pk
1.2 - productId: string pk - 2.1
1.3 - quantity: int
1.4 - price: float
1.5 - createdAt: DateTime
1.6 - updateAt: DateTime
1.7 - orderId: string fk - 3.1

### 2.Product

2.1 - id: string pk
2.2 - name: string
2.3 - description: string
2.4 - price: float
2.5 - imageUrl: string
2.6 - ingredients: string[]
2.7 - restauranteId: string fk - 5.1 && 4.2
2.8 - menuCategoryId: string fk - 4.1
2.9 - createdAt: DateTime
2.10 - updatedAt: DateTime

### 3.Order
3.1 - id: string pk
3.2 - total: float
3.3 - status: OrderStatus
3.4 - consumptionMethod: OrderCOnsumptionMethod
3.5 - createdId: DateTime
3.6 - updatedAt: DateTime

### 4.MenuCategory

4.1 - id: string pk
4.2 - restaurantId: string pk
4.3 - name: string
4.4 - createdAt: DateTime
4.5 - updatedAt: DateTime

### 5.Restaurant

5.1 - id: string pg
5.2 - name: string
5.3 - slug (id legível): string
5.4 - description: string
5.5 - avatarImageUrl: string
5.6 - coverImageUrl: string
5.7 - createdAt: DateTime
5.8 - updatedAt: DateTime
