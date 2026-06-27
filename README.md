# Pokédex Explorer

Aplicativo mobile de exploração de Pokémon construído com Expo e React Native. Consome a [PokéAPI GraphQL v1beta2](https://pokeapi.co/docs/graphql) para listar Pokémon, exibir detalhes, gerenciar favoritos e mostrar estatísticas agregadas.

O briefing original do teste técnico está em [TECHNICAL_TEST.md](./TECHNICAL_TEST.md).

## Pré-requisitos

- Node.js >= 18
- Yarn
- Expo Go (dispositivo físico) ou simulador iOS/Android configurado

> Para módulos nativos (ex.: AsyncStorage), use `npx expo install <pacote>` em vez de `yarn add` diretamente — isso garante compatibilidade com o SDK do Expo.

## Como rodar

```bash
# Instalar dependências
yarn

# Gerar tipos GraphQL (requer acesso à API)
yarn codegen

# Iniciar o servidor de desenvolvimento
yarn start
```

Escaneie o QR code com o Expo Go ou pressione `i` / `a` para abrir no simulador, ou `w` para o navegador.

## Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `yarn start` | Inicia o Expo dev server |
| `yarn android` | Abre no emulador Android |
| `yarn ios` | Abre no simulador iOS |
| `yarn web` | Abre no navegador |
| `yarn codegen` | Gera tipos e hooks Apollo a partir das queries GraphQL |
| `yarn codegen:watch` | Codegen em modo watch |
| `yarn lint` | Executa o linter |
| `yarn test` | Roda todos os testes |
| `yarn test:watch` | Roda testes em modo watch |

## Testes

```bash
yarn test          # roda todos os testes
yarn test:watch    # modo watch
```

## API utilizada

- **Endpoint:** `https://graphql.pokeapi.co/v1beta2`
- **Console GraphiQL:** [graphql.pokeapi.co/v1beta2/console](https://graphql.pokeapi.co/v1beta2/console/)

### Limitações conhecidas

- Rate limit de ~100 requisições/hora por IP
- API pode ficar lenta ou indisponível (manutenção diária ~2 min às 01:00 UTC)
- O app usa `cache-first` no Apollo Client e paginação para respeitar o fair use

## Estrutura do projeto

```
src/
  app/                    # Rotas Expo Router (finas, apenas re-exportam features)
    (tabs)/               # Abas: Pokédex | Stats
    pokemon/[id].tsx      # Detalhe do Pokémon
  features/               # MVVM por feature
    pokemon-list/
      pokemon-model.ts    # ViewModel (estado, queries, ações)
      pokemon-view.tsx    # UI pura
      index.tsx           # Composição model + view
    pokemon-detail/
    pokemon-stats/
  graphql/
    client.ts             # Apollo Client
    operations/           # Queries .graphql
    generated/            # Tipos e hooks gerados pelo codegen
  lib/
    favorites.ts          # Persistência de favoritos (AsyncStorage)
    pokemon-image.ts      # Helper de URL de sprite
```

## Padrão MVVM

Cada feature segue a mesma tríade de arquivos:

- **pokemon-model.ts** — hook com lógica de negócio, estado e integração Apollo
- **pokemon-view.tsx** — componente de UI que recebe props, sem fetch direto
- **index.tsx** — conecta o model à view

Rotas em `src/app/` não contêm lógica de negócio.

## Funcionalidades

- Lista paginada de Pokémon com busca por nome e filtro por tipo
- Tela de detalhe com stats, habilidades e informações da espécie
- Favoritos persistidos localmente (sobrevivem ao restart)
- Aba de estatísticas com totais e percentuais derivados da API
- Estados de loading, erro com retry e empty state
