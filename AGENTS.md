# AGENTS.md

Guia rápido para agentes de IA trabalhando neste repositório.

## O que é este projeto

Pokédex Explorer — app mobile Expo que lista Pokémon, exibe detalhes, gerencia favoritos e mostra estatísticas da PokéAPI GraphQL.

## Comandos

```bash
yarn              # instalar deps
yarn codegen      # gerar tipos GraphQL (requer API online)
yarn start        # dev server
```

## Arquitetura

- **MVVM** em `src/features/<feature>/` com `pokemon-model.ts`, `pokemon-view.tsx`, `index.tsx`
- **Rotas** em `src/app/` são finas — sem lógica de negócio
- **GraphQL** via Apollo Client + codegen em `src/graphql/`

## Navegação

- `(tabs)/index` — lista de Pokémon
- `(tabs)/stats` — estatísticas agregadas
- `pokemon/[id]` — detalhe (stack sobre tabs)

## Regras importantes

1. Manter código simples e objetivo
2. Queries em arquivos `.graphql`, nunca inline
3. Favoritos persistidos em AsyncStorage (`src/lib/favorites.ts`)
4. Tratar loading, erro e empty states
5. Ícones sempre via `@expo/vector-icons` (ver `.cursor/rules/expo-icons.mdc`)
6. Briefing original do teste em `TECHNICAL_TEST.md`

## API

- `https://graphql.pokeapi.co/v1beta2`
- Rate limited — respeitar cache e paginação
