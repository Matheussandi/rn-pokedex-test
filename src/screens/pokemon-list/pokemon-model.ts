import { useState } from "react";

import { useQuery } from "@apollo/client/react";

import { useRouter } from "expo-router";

import {
  ListPokemonByTypeDocument,
  ListPokemonDocument,
  ListPokemonQuery,
  ListPokemonTypesDocument,
} from "@/graphql/generated/graphql";

import { useFavorites } from "@/contexts/favorites";
import { mergeById } from "@/utils/array";

const PAGE_SIZE = 20;

export type PokemonListItem = ListPokemonQuery["pokemon"][number];

export function usePokemonListModel() {
  const router = useRouter();

  const { isFavorite, toggleFavorite } = useFavorites();

  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedType, setAppliedType] = useState<string | null>(null);
  const [draftSearch, setDraftSearch] = useState("");
  const [draftType, setDraftType] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [lastSyncedData, setLastSyncedData] =
    useState<ListPokemonQuery | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const trimmedSearch = appliedSearch.trim();
  const searchVariable = trimmedSearch ? `%${trimmedSearch}%` : "%";

  const listVariables = {
    limit: PAGE_SIZE,
    offset,
    search: searchVariable,
  };

  const typedListVariables = {
    ...listVariables,
    type: appliedType ?? "",
  };

  const {
    data: listData,
    loading: listLoading,
    error: listError,
    refetch: refetchList,
    networkStatus: listNetworkStatus,
  } = useQuery(ListPokemonDocument, {
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
  } = useQuery(ListPokemonByTypeDocument, {
    variables: typedListVariables,
    notifyOnNetworkStatusChange: true,
    skip: !appliedType,
  });

  const data = appliedType ? typedListData : listData;
  const loading = appliedType ? typedListLoading : listLoading;
  const error = appliedType ? typedListError : listError;

  const networkStatus = appliedType
    ? typedListNetworkStatus
    : listNetworkStatus;
  const refetch = appliedType ? refetchTypedList : refetchList;

  const { data: typesData } = useQuery(ListPokemonTypesDocument);

  const types = typesData?.type ?? [];
  const isInitialLoading = loading && offset === 0 && pokemons.length === 0;
  const isLoadingMore = loading && offset > 0;
  const hasMore = (data?.pokemon.length ?? 0) === PAGE_SIZE;

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
      await refetch({
        limit: PAGE_SIZE,
        offset: 0,
        search: searchVariable,
        ...(appliedType ? { type: appliedType } : {}),
      });
    } finally {
      setIsRefreshing(false);
    }
  }

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

  if (data?.pokemon && data !== lastSyncedData) {
    setLastSyncedData(data);
    setPokemons((current) =>
      offset === 0 ? data.pokemon : mergeById(current, data.pokemon),
    );
  }

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
