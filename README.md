# Pokédex Explorer

Aplicativo mobile de exploração de Pokémon construído com Expo e React Native. Consome a [PokéAPI GraphQL v1beta2](https://pokeapi.co/docs/graphql) para listar Pokémon, exibir detalhes, gerenciar favoritos e mostrar estatísticas agregadas.

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

| Script               | Descrição                                              |
| -------------------- | ------------------------------------------------------ |
| `yarn start`         | Inicia o Expo dev server                               |
| `yarn android`       | Abre no emulador Android                               |
| `yarn ios`           | Abre no simulador iOS                                  |
| `yarn web`           | Abre no navegador                                      |
| `yarn codegen`       | Gera tipos e hooks Apollo a partir das queries GraphQL |
| `yarn codegen:watch` | Codegen em modo watch                                  |
| `yarn lint`          | Executa o linter                                       |
| `yarn test`          | Roda todos os testes                                   |
| `yarn test:watch`    | Roda testes em modo watch                              |

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
  app/                    # Rotas Expo Router (finas, compõem model + view)
    (tabs)/               # Abas: Pokédex | Stats
    pokemon/[id].tsx      # Detalhe do Pokémon
  screens/                # MVVM por feature
    pokemon-list/
      pokemon-model.ts    # ViewModel (estado, ações)
      pokemon-view.tsx    # UI pura
    pokemon-detail/
    pokemon-stats/
  hooks/                  # Hooks de dados (queries Apollo abstraídas)
    use-active-pokemon-list.ts
  graphql/
    client.ts             # Apollo Client
    operations/           # Queries .graphql
    generated/            # Tipos e hooks gerados pelo codegen
  utils/                  # Funções puras (paginação, formatação, etc.)
  lib/                    # Tema, cores, haptics
```

## Padrão MVVM

Cada feature segue a mesma dupla de arquivos:

- **pokemon-model.ts** — ViewModel: estado, ações e orquestração
- **pokemon-view.tsx** — componente de UI que recebe props, sem fetch direto

Hooks de dados extraídos do ViewModel (ex.: queries Apollo) ficam em `src/hooks/`.

Rotas em `src/app/` não contêm lógica de negócio.

## Funcionalidades

- Lista paginada de Pokémon com busca por nome e filtro por tipo
- Tela de detalhe com stats, habilidades e informações da espécie
- Favoritos persistidos localmente (sobrevivem ao restart)
- Aba de estatísticas com totais e percentuais derivados da API
- Estados de loading, erro com retry e empty state

## Checklist do teste técnico

Requisitos do [TECHNICAL_TEST.md](./TECHNICAL_TEST.md) e status da implementação:

| Requisito                              |     | Implementação                                              |
| -------------------------------------- | :-: | ---------------------------------------------------------- |
| API GraphQL pública (sem autenticação) | ✅  | [PokéAPI GraphQL v1beta2](https://pokeapi.co/docs/graphql) |
| Lista scrollável de itens              | ✅  | `FlatList` paginada em `/pokemon`                          |
| Nome/título em cada item               | ✅  | Nome do Pokémon capitalizado no card                       |
| Campos secundários relevantes          | ✅  | Tipos, altura e peso no card                               |
| Indicador visual de favorito           | ✅  | Ícone no `PokemonListCard`                                 |
| Busca por nome                         | ✅  | Modal de filtros com busca `_ilike`                        |
| Filtro por campo relevante (tipo)      | ✅  | Chips de tipo no modal de filtros                          |
| Tela de detalhe acessível pela lista   | ✅  | Rota `/pokemon/[id]`                                       |
| Campos relevantes do item no detalhe   | ✅  | Stats, habilidades, espécie, flavor text, sprite           |
| Toggle de favorito no detalhe          | ✅  | `FavoriteButton` no header                                 |
| Favoritos persistidos localmente       | ✅  | `AsyncStorage` via `FavoritesProvider`                     |
| Tela de estatísticas agregadas         | ✅  | Rota `/stats`                                              |
| Total de itens (derivado da API)       | ✅  | Total de Pokémon na query de stats                         |
| Taxa ou percentual relevante           | ✅  | Taxa de lendários (`legendaryRate`)                        |
| Categorias distintas                   | ✅  | Quantidade de tipos distintos                              |
| Tratamento de loading e erro           | ✅  | `Loading`, `ErrorState` com retry e empty state            |
| Expo (managed workflow)                | ✅  | Expo SDK 56                                                |
| Expo Router                            | ✅  | Rotas em `src/app/`                                        |
| TypeScript                             | ✅  | Projeto em TypeScript strict                               |
| Apollo Client                          | ✅  | `@apollo/client` + codegen                                 |
| Testes com Jest e RNTL                 | ✅  | Utils, favoritos e componentes (`yarn test`)               |
| Fluxos Maestro (opcional)              | ❌  | Não implementado                                           |
| Testes Playwright web (opcional)       | ❌  | Não implementado                                           |

> ✅ implementado · ❌ não implementado

## Autor

Desenvolvido por **[Matheus Sandi](https://github.com/Matheussandi)** como entrega do teste técnico para o time de Tecnologia da [Hubs Contabilidade](https://hubscontabilidade.com.br).
