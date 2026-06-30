import { useQuery } from "@apollo/client/react";

import {
  ListPokemonByTypeDocument,
  ListPokemonDocument,
  ListPokemonQuery,
} from "@/graphql/generated/graphql";

export const PAGE_SIZE = 20;

export type PokemonListItem = ListPokemonQuery["pokemon"][number];

export function buildSearchPattern(search: string): string {
  const trimmed = search.trim();
  return trimmed ? `%${trimmed}%` : "%";
}

export function buildListVariables(
  offset: number,
  search: string,
  type: string | null,
) {
  const base = { limit: PAGE_SIZE, offset, search };
  return type ? { ...base, type } : base;
}

/**
 * Executa a query correta (lista completa x filtrada por tipo) e expõe um
 * resultado único, escondendo de quem consome que existem duas queries por baixo.
 */
export function useActivePokemonList(
  appliedType: string | null,
  offset: number,
  search: string,
) {
  const allResult = useQuery(ListPokemonDocument, {
    variables: { limit: PAGE_SIZE, offset, search },
    notifyOnNetworkStatusChange: true,
    skip: !!appliedType,
  });

  const byTypeResult = useQuery(ListPokemonByTypeDocument, {
    variables: { limit: PAGE_SIZE, offset, search, type: appliedType ?? "" },
    notifyOnNetworkStatusChange: true,
    skip: !appliedType,
  });

  const active = appliedType ? byTypeResult : allResult;

  function refetchFirstPage() {
    return active.refetch(buildListVariables(0, search, appliedType));
  }

  return {
    data: active.data,
    loading: active.loading,
    error: active.error,
    networkStatus: active.networkStatus,
    refetch: active.refetch,
    refetchFirstPage,
  };
}
