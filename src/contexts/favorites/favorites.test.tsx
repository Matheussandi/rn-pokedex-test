import type { ReactNode } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook, waitFor } from "@testing-library/react-native";

import { FavoritesProvider, useFavorites } from "./favorites-context";

jest.mock("@react-native-async-storage/async-storage", () =>
  jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock",
  ),
);

function wrapper({ children }: { children: ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}

describe("useFavorites", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it("inicia com lista vazia após carregar", async () => {
    const { result } = await renderHook(() => useFavorites(), { wrapper });

    await waitFor(() => {
      expect(result.current?.isReady).toBe(true);
    });

    expect(result.current?.favoriteIds).toEqual([]);
    expect(result.current?.isFavorite(25)).toBe(false);
  });

  it("adiciona favorito ao alternar", async () => {
    const { result } = await renderHook(() => useFavorites(), { wrapper });

    await waitFor(() => {
      expect(result.current?.isReady).toBe(true);
    });

    await act(async () => {
      await result.current?.toggleFavorite(25);
    });

    expect(result.current?.isFavorite(25)).toBe(true);
    expect(result.current?.favoriteIds).toEqual([25]);
  });

  it("remove favorito ao alternar duas vezes", async () => {
    const { result } = await renderHook(() => useFavorites(), { wrapper });

    await waitFor(() => {
      expect(result.current?.isReady).toBe(true);
    });

    await act(async () => {
      await result.current?.toggleFavorite(25);
    });

    await act(async () => {
      await result.current?.toggleFavorite(25);
    });

    expect(result.current?.isFavorite(25)).toBe(false);
    expect(result.current?.favoriteIds).toEqual([]);
  });

  it("persiste favoritos no AsyncStorage", async () => {
    const { result } = await renderHook(() => useFavorites(), { wrapper });

    await waitFor(() => {
      expect(result.current?.isReady).toBe(true);
    });

    await act(async () => {
      await result.current?.toggleFavorite(25);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@pokedex:favorites",
      JSON.stringify([25]),
    );
  });

  it("carrega favoritos salvos na inicialização", async () => {
    await AsyncStorage.setItem("@pokedex:favorites", JSON.stringify([7, 25]));

    const { result } = await renderHook(() => useFavorites(), { wrapper });

    await waitFor(() => {
      expect(result.current?.isReady).toBe(true);
    });

    expect(result.current?.favoriteIds).toEqual([7, 25]);
    expect(result.current?.isFavorite(7)).toBe(true);
    expect(result.current?.isFavorite(25)).toBe(true);
  });

  it("reverte estado quando persistência falha", async () => {
    const { result } = await renderHook(() => useFavorites(), { wrapper });

    await waitFor(() => {
      expect(result.current?.isReady).toBe(true);
    });

    jest
      .spyOn(AsyncStorage, "setItem")
      .mockRejectedValueOnce(new Error("Storage unavailable"));

    let success = true;

    await act(async () => {
      success = (await result.current?.toggleFavorite(25)) ?? false;
    });

    expect(success).toBe(false);
    expect(result.current?.isFavorite(25)).toBe(false);
    expect(result.current?.favoriteIds).toEqual([]);
  });

  it("compartilha estado entre múltiplos consumidores do mesmo provider", async () => {
    const { result } = await renderHook(
      () => {
        const detail = useFavorites();
        const list = useFavorites();

        return { detail, list };
      },
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current?.detail.isReady).toBe(true);
    });

    await act(async () => {
      await result.current?.detail.toggleFavorite(25);
    });

    expect(result.current?.detail.isFavorite(25)).toBe(true);
    expect(result.current?.list.isFavorite(25)).toBe(true);
    expect(result.current?.list.favoriteIds).toEqual([25]);
  });
});
