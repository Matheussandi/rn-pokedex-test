import { useState } from "react";

import { useQuery } from "@apollo/client/react";

import { useLocalSearchParams } from "expo-router";

import type { DetailTab } from "@/components/ui";

import { GetPokemonDetailDocument } from "@/graphql/generated/graphql";

import { useFavorites } from "@/contexts/favorites";
import { getPrimaryTypeColor } from "@/lib/color-utils";
import { colors } from "@/lib/theme";
import { getPokemonFlavorText } from "@/utils/flavor-text";
import {
  capitalizeName,
  formatPokemonId,
  getPokemonImageUrlFor,
} from "@/utils/pokemon-image";

export function usePokemonDetailModel() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const pokemonId = Number(id);

  const { isFavorite, toggleFavorite } = useFavorites();

  const [activeTab, setActiveTab] = useState<DetailTab>("about");

  const { data, loading, error, refetch } = useQuery(GetPokemonDetailDocument, {
    variables: { id: pokemonId },
    skip: Number.isNaN(pokemonId),
  });

  const pokemon = data?.pokemon[0] ?? null;
  const isLoaded = !loading && !error && pokemon !== null;

  const typeColor = pokemon
    ? getPrimaryTypeColor(pokemon.pokemontypes)
    : colors.white;

  return {
    pokemon,
    loading,
    error,
    refetch,
    isLoaded,
    isFavorite: isFavorite(pokemonId),
    toggleFavorite: () => toggleFavorite(pokemonId),
    activeTab,
    setActiveTab,
    typeColor,
    displayName: pokemon ? capitalizeName(pokemon.name) : "Detalhe",
    formattedId: pokemon ? formatPokemonId(pokemon.id) : null,
    imageUrl: pokemon ? getPokemonImageUrlFor(pokemon) : null,
    flavorText: pokemon ? getPokemonFlavorText(pokemon.pokemonspecy) : null,
  };
}
