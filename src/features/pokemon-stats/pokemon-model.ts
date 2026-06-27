import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";

import { PokemonStatsDocument } from "@/graphql/generated/graphql";

export function usePokemonStatsModel() {
  const { data, loading, error, refetch } = useQuery(PokemonStatsDocument);

  const stats = useMemo(() => {
    const total = data?.pokemon_aggregate.aggregate?.count ?? 0;
    const legendary = data?.legendary.aggregate?.count ?? 0;
    const typesCount = data?.type_aggregate.aggregate?.count ?? 0;
    const legendaryRate = total > 0 ? (legendary / total) * 100 : 0;

    return {
      total,
      legendary,
      typesCount,
      legendaryRate,
    };
  }, [data]);

  return {
    stats,
    loading,
    error,
    refetch,
  };
}
