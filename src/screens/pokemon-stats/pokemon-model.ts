import { useQuery } from "@apollo/client/react";

import { GetPokemonStatsDocument } from "@/graphql/generated/graphql";

export function usePokemonStatsModel() {
  const { data, loading, error, refetch } = useQuery(GetPokemonStatsDocument);

  const total = data?.pokemon_aggregate.aggregate?.count ?? 0;
  const legendary = data?.legendary.aggregate?.count ?? 0;
  const typesCount = data?.type_aggregate.aggregate?.count ?? 0;
  const legendaryRate = total > 0 ? (legendary / total) * 100 : 0;

  const stats = {
    total,
    legendary,
    typesCount,
    legendaryRate,
  };

  return {
    stats,
    loading,
    error,
    refetch,
  };
}
