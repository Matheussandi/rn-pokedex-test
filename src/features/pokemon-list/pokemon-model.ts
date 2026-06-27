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

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const searchVariable = useMemo(() => {
    const trimmed = debouncedSearch.trim();
    return trimmed ? `%${trimmed}%` : "%";
  }, [debouncedSearch]);

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
      type: selectedType ?? "",
    }),
    [listVariables, selectedType],
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
    skip: !!selectedType,
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
    skip: !selectedType,
  });

  const data = selectedType ? typedListData : listData;
  const loading = selectedType ? typedListLoading : listLoading;
  const error = selectedType ? typedListError : listError;
  const networkStatus = selectedType ? typedListNetworkStatus : listNetworkStatus;
  const refetch = selectedType ? refetchTypedList : refetchList;

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
        ...(selectedType ? { type: selectedType } : {}),
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch, searchVariable, selectedType]);

  const openDetail = useCallback(
    (id: number) => {
      router.push(`/pokemon/${id}`);
    },
    [router],
  );

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchText), 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    setOffset(0);
    setPokemons([]);
  }, [debouncedSearch, selectedType]);

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
    searchText,
    selectedType,
    isInitialLoading,
    isLoadingMore,
    isRefreshing,
    error,
    hasMore,
    networkStatus,
    setSearchText,
    setSelectedType,
    loadMore,
    refresh,
    refetch,
    openDetail,
    isFavorite,
    toggleFavorite,
  };
}
