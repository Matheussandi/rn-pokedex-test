import { useEffect, useState } from "react";

import { useQuery } from "@apollo/client/react";

import { useRouter } from "expo-router";

import { ListPokemonTypesDocument } from "@/graphql/generated/graphql";

import { useFavorites } from "@/contexts/favorites";
import { appendNewById } from "@/utils/pagination";
import { buildSearchPattern } from "@/utils/search-pattern";

import {
  PAGE_SIZE,
  useActivePokemonList,
  type PokemonListItem,
} from "@/hooks/use-active-pokemon-list";

export type { PokemonListItem };

export function usePokemonListModel() {
  const router = useRouter();

  const { isFavorite, toggleFavorite } = useFavorites();

  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedType, setAppliedType] = useState<string | null>(null);
  const [draftSearch, setDraftSearch] = useState("");
  const [draftType, setDraftType] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const searchVariable = buildSearchPattern(appliedSearch);

  const { data, loading, error, networkStatus, refetch, refetchFirstPage } =
    useActivePokemonList(appliedType, offset, searchVariable);

  const { data: typesData } = useQuery(ListPokemonTypesDocument);

  const types = typesData?.type ?? [];
  const isInitialLoading = loading && offset === 0 && pokemons.length === 0;
  const isLoadingMore = loading && offset > 0;
  const hasMore = (data?.pokemon.length ?? 0) === PAGE_SIZE;

  function openDetail(id: number) {
    router.push(`/pokemon/${id}`);
  }

  function openFilterModal() {
    setDraftSearch(appliedSearch);
    setDraftType(appliedType);
    setIsFilterModalVisible(true);
  }

  function closeFilterModal() {
    setIsFilterModalVisible(false);
  }

  function clearFilters() {
    setDraftSearch("");
    setDraftType(null);
  }

  function applyFilters() {
    setAppliedSearch(draftSearch);
    setAppliedType(draftType);
    setOffset(0);
    setPokemons([]);
    setIsFilterModalVisible(false);
  }

  function loadMore() {
    if (loading || !hasMore) {
      return;
    }

    setOffset((current) => current + PAGE_SIZE);
  }

  async function refresh() {
    setIsRefreshing(true);
    setOffset(0);

    try {
      await refetchFirstPage();
    } finally {
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    if (!data?.pokemon) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPokemons((current) =>
      offset === 0 ? data.pokemon : appendNewById(current, data.pokemon),
    );
  }, [data, offset]);

  return {
    pokemons,
    types,
    draftSearch,
    draftType,
    isInitialLoading,
    isLoadingMore,
    isRefreshing,
    error,
    hasMore,
    networkStatus,
    setDraftSearch,
    setDraftType,
    clearFilters,
    applyFilters,
    loadMore,
    refresh,
    refetch,
    openDetail,
    isFavorite,
    toggleFavorite,
    isFilterModalVisible,
    openFilterModal,
    closeFilterModal,
  };
}
