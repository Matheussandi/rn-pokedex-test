import { useCallback, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@pokedex:favorites";

async function readFavoriteIds(): Promise<number[]> {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as number[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeFavoriteIds(ids: number[]): Promise<void> {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch {
    // Storage indisponível — favoritos ficam apenas em memória nesta sessão
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    readFavoriteIds()
      .then(setFavoriteIds)
      .catch(() => setFavoriteIds([]))
      .finally(() => setIsReady(true));
  }, []);

  const isFavorite = useCallback(
    (id: number) => favoriteIds.includes(id),
    [favoriteIds],
  );

  const toggleFavorite = useCallback(async (id: number) => {
    setFavoriteIds((current) => {
      const next = current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id];

      void writeFavoriteIds(next);
      return next;
    });
  }, []);

  return {
    favoriteIds,
    isReady,
    isFavorite,
    toggleFavorite,
  };
}
