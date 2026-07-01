import type { ReactNode } from "react";

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";

import { FavoriteButton } from "./favorite-button";
import { ToastProvider } from "./toast";
import { colors } from "@/lib/theme";

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn().mockResolvedValue(undefined),
  ImpactFeedbackStyle: { Light: "light" },
}));

function renderWithToast(ui: ReactNode) {
  return render(<ToastProvider>{ui}</ToastProvider>);
}

describe("FavoriteButton", () => {
  it("chama onToggle ao pressionar", async () => {
    const onToggle = jest.fn().mockResolvedValue(true);

    await renderWithToast(
      <FavoriteButton isFavorite={false} onToggle={onToggle} />,
    );

    await act(async () => {
      fireEvent.press(screen.getByLabelText("Favoritar Pokémon"));
    });

    await waitFor(() => {
      expect(onToggle).toHaveBeenCalledTimes(1);
    });
  });

  it("exibe mensagem de erro quando a persistência falha", async () => {
    const onToggle = jest.fn().mockResolvedValue(false);

    await renderWithToast(
      <FavoriteButton isFavorite={false} onToggle={onToggle} />,
    );

    await act(async () => {
      fireEvent.press(screen.getByLabelText("Favoritar Pokémon"));
    });

    expect(
      screen.getByText("Não foi possível salvar o favorito. Tente novamente."),
    ).toBeOnTheScreen();
  });

  it("não renderiza nada no modo readonly quando não é favorito", async () => {
    await renderWithToast(<FavoriteButton isFavorite={false} readonly />);

    expect(screen.queryByLabelText("Favorito")).toBeNull();
  });

  it("renderiza o indicador no modo readonly quando é favorito", async () => {
    await renderWithToast(<FavoriteButton isFavorite readonly />);

    expect(screen.getByLabelText("Favorito")).toBeOnTheScreen();
  });

  it("renderiza badge de fundo quando withBadge é true", async () => {
    const { toJSON } = await renderWithToast(
      <FavoriteButton isFavorite withBadge />,
    );

    const tree = JSON.stringify(toJSON());
    expect(tree).toContain(`${colors.black}40`);
  });
});
