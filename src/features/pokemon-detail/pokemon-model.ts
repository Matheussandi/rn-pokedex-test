import { useMemo } from "react";

import { useQuery } from "@apollo/client/react";

import { useLocalSearchParams } from "expo-router";

import { PokemonDetailDocument } from "@/graphql/generated/graphql";

import { useFavorites } from "@/lib/favorites";

export function usePokemonDetailModel() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const pokemonId = Number(id);

  const { isFavorite, toggleFavorite } = useFavorites();

  const { data, loading, error, refetch } = useQuery(PokemonDetailDocument, {
    variables: { id: pokemonId },
    skip: Number.isNaN(pokemonId),
  });

  const pokemon = useMemo(() => data?.pokemon[0] ?? null, [data]);

  return {
    pokemon,
    loading,
    error,
    refetch,
    isFavorite: isFavorite(pokemonId),
    toggleFavorite: () => toggleFavorite(pokemonId),
  };
}
