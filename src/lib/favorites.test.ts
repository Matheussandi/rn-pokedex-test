import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook, waitFor } from "@testing-library/react-native";

import { useFavorites } from "./favorites";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

describe("useFavorites", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it("inicia com lista vazia após carregar", async () => {
    const { result } = await renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current?.isReady).toBe(true);
    });

    expect(result.current?.favoriteIds).toEqual([]);
    expect(result.current?.isFavorite(25)).toBe(false);
  });

  it("adiciona favorito ao alternar", async () => {
    const { result } = await renderHook(() => useFavorites());

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
    const { result } = await renderHook(() => useFavorites());

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
    const { result } = await renderHook(() => useFavorites());

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

    const { result } = await renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current?.isReady).toBe(true);
    });

    expect(result.current?.favoriteIds).toEqual([7, 25]);
    expect(result.current?.isFavorite(7)).toBe(true);
    expect(result.current?.isFavorite(25)).toBe(true);
  });

  it("reverte estado quando persistência falha", async () => {
    const { result } = await renderHook(() => useFavorites());

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
});
