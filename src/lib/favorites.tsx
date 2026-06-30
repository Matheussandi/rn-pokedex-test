import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

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

type FavoritesContextValue = {
  favoriteIds: number[];
  isReady: boolean;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => Promise<boolean>;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function useFavoritesState(): FavoritesContextValue {
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

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const value = useFavoritesState();

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
}
