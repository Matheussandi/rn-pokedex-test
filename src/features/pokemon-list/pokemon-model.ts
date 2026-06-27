import { useQuery } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  PokemonListByTypeDocument,
  PokemonListDocument,
  PokemonListQuery,
  PokemonTypesDocument,
} from "@/graphql/generated/graphql";
import { mergeById } from "@/utils/array";
import { useFavorites } from "@/lib/favorites";

const PAGE_SIZE = 20;

export type PokemonListItem = PokemonListQuery["pokemon"][number];

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

  const searchVariable = useMemo(() => {
    const trimmed = appliedSearch.trim();
    return trimmed ? `%${trimmed}%` : "%";
  }, [appliedSearch]);

  const listVariables = useMemo(
    () => ({
      limit: PAGE_SIZE,
      offset,
      search: searchVariable,
    }),
    [offset, searchVariable],
  );

  const typedListVariables = useMemo(
    () => ({
      ...listVariables,
      type: appliedType ?? "",
    }),
    [listVariables, appliedType],
  );

  const {
    data: listData,
    loading: listLoading,
    error: listError,
    refetch: refetchList,
    networkStatus: listNetworkStatus,
  } = useQuery(PokemonListDocument, {
    variables: listVariables,
    notifyOnNetworkStatusChange: true,
    skip: !!appliedType,
  });

  const {
    data: typedListData,
    loading: typedListLoading,
    error: typedListError,
    refetch: refetchTypedList,
    networkStatus: typedListNetworkStatus,
  } = useQuery(PokemonListByTypeDocument, {
    variables: typedListVariables,
    notifyOnNetworkStatusChange: true,
    skip: !appliedType,
  });

  const data = appliedType ? typedListData : listData;
  const loading = appliedType ? typedListLoading : listLoading;
  const error = appliedType ? typedListError : listError;
  const networkStatus = appliedType ? typedListNetworkStatus : listNetworkStatus;
  const refetch = appliedType ? refetchTypedList : refetchList;

  const { data: typesData } = useQuery(PokemonTypesDocument);

  const types = typesData?.type ?? [];
  const isInitialLoading = loading && offset === 0 && pokemons.length === 0;
  const isLoadingMore = loading && offset > 0;
  const hasMore = (data?.pokemon.length ?? 0) === PAGE_SIZE;

  const loadMore = useCallback(() => {
    if (loading || !hasMore) {
      return;
    }

    setOffset((current) => current + PAGE_SIZE);
  }, [loading, hasMore]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setOffset(0);

    try {
      await refetch({
        limit: PAGE_SIZE,
        offset: 0,
        search: searchVariable,
        ...(appliedType ? { type: appliedType } : {}),
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch, searchVariable, appliedType]);

  const openDetail = useCallback(
    (id: number) => {
      router.push(`/pokemon/${id}`);
    },
    [router],
  );

  const openFilterModal = useCallback(() => {
    setDraftSearch(appliedSearch);
    setDraftType(appliedType);
    setIsFilterModalVisible(true);
  }, [appliedSearch, appliedType]);

  const closeFilterModal = useCallback(() => {
    setIsFilterModalVisible(false);
  }, []);

  const clearFilters = useCallback(() => {
    setDraftSearch("");
    setDraftType(null);
  }, []);

  const applyFilters = useCallback(() => {
    setAppliedSearch(draftSearch);
    setAppliedType(draftType);
    setIsFilterModalVisible(false);
  }, [draftSearch, draftType]);

  useEffect(() => {
    setOffset(0);
    setPokemons([]);
  }, [appliedSearch, appliedType]);

  useEffect(() => {
    if (!data?.pokemon) {
      return;
    }

    if (offset === 0) {
      setPokemons(data.pokemon);
      return;
    }

    setPokemons((current) => mergeById(current, data.pokemon));
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
