/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query PokemonDetail($id: Int!) {\n  pokemon(where: {id: {_eq: $id}}) {\n    id\n    name\n    height\n    weight\n    base_experience\n    order\n    is_default\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonabilities {\n      ability {\n        name\n      }\n      is_hidden\n    }\n    pokemonstats {\n      base_stat\n      effort\n      stat {\n        name\n      }\n    }\n    pokemonspecy {\n      capture_rate\n      is_legendary\n      is_mythical\n    }\n    pokemonsprites {\n      sprites\n    }\n  }\n}": typeof types.PokemonDetailDocument,
    "query PokemonListByType($limit: Int!, $offset: Int!, $search: String!, $type: String!) {\n  pokemon(\n    limit: $limit\n    offset: $offset\n    where: {name: {_ilike: $search}, pokemontypes: {type: {name: {_eq: $type}}}}\n    order_by: {id: asc}\n  ) {\n    id\n    name\n    height\n    weight\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites\n    }\n  }\n}": typeof types.PokemonListByTypeDocument,
    "query PokemonList($limit: Int!, $offset: Int!, $search: String!) {\n  pokemon(\n    limit: $limit\n    offset: $offset\n    where: {name: {_ilike: $search}}\n    order_by: {id: asc}\n  ) {\n    id\n    name\n    height\n    weight\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites\n    }\n  }\n}": typeof types.PokemonListDocument,
    "query PokemonStats {\n  pokemon_aggregate {\n    aggregate {\n      count\n    }\n  }\n  type_aggregate {\n    aggregate {\n      count\n    }\n  }\n  legendary: pokemon_aggregate(where: {pokemonspecy: {is_legendary: {_eq: true}}}) {\n    aggregate {\n      count\n    }\n  }\n}": typeof types.PokemonStatsDocument,
    "query PokemonTypes {\n  type(order_by: {name: asc}) {\n    id\n    name\n  }\n}": typeof types.PokemonTypesDocument,
};
const documents: Documents = {
    "query PokemonDetail($id: Int!) {\n  pokemon(where: {id: {_eq: $id}}) {\n    id\n    name\n    height\n    weight\n    base_experience\n    order\n    is_default\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonabilities {\n      ability {\n        name\n      }\n      is_hidden\n    }\n    pokemonstats {\n      base_stat\n      effort\n      stat {\n        name\n      }\n    }\n    pokemonspecy {\n      capture_rate\n      is_legendary\n      is_mythical\n    }\n    pokemonsprites {\n      sprites\n    }\n  }\n}": types.PokemonDetailDocument,
    "query PokemonListByType($limit: Int!, $offset: Int!, $search: String!, $type: String!) {\n  pokemon(\n    limit: $limit\n    offset: $offset\n    where: {name: {_ilike: $search}, pokemontypes: {type: {name: {_eq: $type}}}}\n    order_by: {id: asc}\n  ) {\n    id\n    name\n    height\n    weight\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites\n    }\n  }\n}": types.PokemonListByTypeDocument,
    "query PokemonList($limit: Int!, $offset: Int!, $search: String!) {\n  pokemon(\n    limit: $limit\n    offset: $offset\n    where: {name: {_ilike: $search}}\n    order_by: {id: asc}\n  ) {\n    id\n    name\n    height\n    weight\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites\n    }\n  }\n}": types.PokemonListDocument,
    "query PokemonStats {\n  pokemon_aggregate {\n    aggregate {\n      count\n    }\n  }\n  type_aggregate {\n    aggregate {\n      count\n    }\n  }\n  legendary: pokemon_aggregate(where: {pokemonspecy: {is_legendary: {_eq: true}}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.PokemonStatsDocument,
    "query PokemonTypes {\n  type(order_by: {name: asc}) {\n    id\n    name\n  }\n}": types.PokemonTypesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query PokemonDetail($id: Int!) {\n  pokemon(where: {id: {_eq: $id}}) {\n    id\n    name\n    height\n    weight\n    base_experience\n    order\n    is_default\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonabilities {\n      ability {\n        name\n      }\n      is_hidden\n    }\n    pokemonstats {\n      base_stat\n      effort\n      stat {\n        name\n      }\n    }\n    pokemonspecy {\n      capture_rate\n      is_legendary\n      is_mythical\n    }\n    pokemonsprites {\n      sprites\n    }\n  }\n}"): (typeof documents)["query PokemonDetail($id: Int!) {\n  pokemon(where: {id: {_eq: $id}}) {\n    id\n    name\n    height\n    weight\n    base_experience\n    order\n    is_default\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonabilities {\n      ability {\n        name\n      }\n      is_hidden\n    }\n    pokemonstats {\n      base_stat\n      effort\n      stat {\n        name\n      }\n    }\n    pokemonspecy {\n      capture_rate\n      is_legendary\n      is_mythical\n    }\n    pokemonsprites {\n      sprites\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query PokemonListByType($limit: Int!, $offset: Int!, $search: String!, $type: String!) {\n  pokemon(\n    limit: $limit\n    offset: $offset\n    where: {name: {_ilike: $search}, pokemontypes: {type: {name: {_eq: $type}}}}\n    order_by: {id: asc}\n  ) {\n    id\n    name\n    height\n    weight\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites\n    }\n  }\n}"): (typeof documents)["query PokemonListByType($limit: Int!, $offset: Int!, $search: String!, $type: String!) {\n  pokemon(\n    limit: $limit\n    offset: $offset\n    where: {name: {_ilike: $search}, pokemontypes: {type: {name: {_eq: $type}}}}\n    order_by: {id: asc}\n  ) {\n    id\n    name\n    height\n    weight\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query PokemonList($limit: Int!, $offset: Int!, $search: String!) {\n  pokemon(\n    limit: $limit\n    offset: $offset\n    where: {name: {_ilike: $search}}\n    order_by: {id: asc}\n  ) {\n    id\n    name\n    height\n    weight\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites\n    }\n  }\n}"): (typeof documents)["query PokemonList($limit: Int!, $offset: Int!, $search: String!) {\n  pokemon(\n    limit: $limit\n    offset: $offset\n    where: {name: {_ilike: $search}}\n    order_by: {id: asc}\n  ) {\n    id\n    name\n    height\n    weight\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query PokemonStats {\n  pokemon_aggregate {\n    aggregate {\n      count\n    }\n  }\n  type_aggregate {\n    aggregate {\n      count\n    }\n  }\n  legendary: pokemon_aggregate(where: {pokemonspecy: {is_legendary: {_eq: true}}}) {\n    aggregate {\n      count\n    }\n  }\n}"): (typeof documents)["query PokemonStats {\n  pokemon_aggregate {\n    aggregate {\n      count\n    }\n  }\n  type_aggregate {\n    aggregate {\n      count\n    }\n  }\n  legendary: pokemon_aggregate(where: {pokemonspecy: {is_legendary: {_eq: true}}}) {\n    aggregate {\n      count\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query PokemonTypes {\n  type(order_by: {name: asc}) {\n    id\n    name\n  }\n}"): (typeof documents)["query PokemonTypes {\n  type(order_by: {name: asc}) {\n    id\n    name\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;