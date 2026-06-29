import { useEffect, useRef, useState } from "react";

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

async function writeFavoriteIds(ids: number[]): Promise<boolean> {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    return true;
  } catch {
    return false;
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const favoriteIdsRef = useRef<number[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    readFavoriteIds()
      .then((ids) => {
        setFavoriteIds(ids);
        favoriteIdsRef.current = ids;
      })
      .catch(() => {
        setFavoriteIds([]);
        favoriteIdsRef.current = [];
      })
      .finally(() => setIsReady(true));
  }, []);

  function isFavorite(id: number) {
    return favoriteIds.includes(id);
  }

  async function toggleFavorite(id: number): Promise<boolean> {
    const current = favoriteIdsRef.current;
    const next = current.includes(id)
      ? current.filter((favoriteId) => favoriteId !== id)
      : [...current, id];

    setFavoriteIds(next);
    favoriteIdsRef.current = next;

    const saved = await writeFavoriteIds(next);

    if (!saved) {
      setFavoriteIds(current);
      favoriteIdsRef.current = current;
      return false;
    }

    return true;
  }

  return {
    favoriteIds,
    isReady,
    isFavorite,
    toggleFavorite,
  };
}
