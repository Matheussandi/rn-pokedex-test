import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { readFavoriteIds, writeFavoriteIds } from "./favorites-storage";

type FavoritesContextValue = {
  favoriteIds: number[];
  isReady: boolean;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => Promise<boolean>;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    readFavoriteIds()
      .then(setFavoriteIds)
      .finally(() => setIsReady(true));
  }, []);

  function isFavorite(id: number) {
    return favoriteIds.includes(id);
  }

  async function toggleFavorite(id: number): Promise<boolean> {
    const next = favoriteIds.includes(id)
      ? favoriteIds.filter((favoriteId) => favoriteId !== id)
      : [...favoriteIds, id];

    setFavoriteIds(next);

    const saved = await writeFavoriteIds(next);
    if (!saved) {
      setFavoriteIds(favoriteIds);
    }

    return saved;
  }

  const value: FavoritesContextValue = {
    favoriteIds,
    isReady,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
}
