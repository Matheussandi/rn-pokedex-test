import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@pokedex:favorites";

export async function readFavoriteIds(): Promise<number[]> {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    const parsed = raw ? (JSON.parse(raw) as number[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeFavoriteIds(ids: number[]): Promise<boolean> {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    return true;
  } catch {
    return false;
  }
}
