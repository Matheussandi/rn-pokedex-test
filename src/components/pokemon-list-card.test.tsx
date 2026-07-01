import type { ReactNode } from "react";

import { fireEvent, render, screen } from "@testing-library/react-native";

import { ToastProvider } from "@/components/ui";
import type { ListPokemonQuery } from "@/graphql/generated/graphql";

import { PokemonListCard } from "./pokemon-list-card";

type ListPokemon = ListPokemonQuery["pokemon"][number];

function buildPokemon(overrides: Partial<ListPokemon> = {}): ListPokemon {
  return {
    id: 25,
    name: "pikachu",
    height: 4,
    weight: 60,
    pokemontypes: [{ type: { name: "electric" } }],
    pokemonsprites: [],
    ...overrides,
  };
}

function renderWithToast(ui: ReactNode) {
  return render(<ToastProvider>{ui}</ToastProvider>);
}

describe("PokemonListCard", () => {
  it("renderiza o nome capitalizado", async () => {
    await renderWithToast(
      <PokemonListCard
        pokemon={buildPokemon()}
        isFavorite={false}
        onOpen={() => {}}
      />,
    );

    expect(screen.getByText("Pikachu")).toBeOnTheScreen();
  });

  it("exibe o indicador de favorito quando isFavorite é true", async () => {
    await renderWithToast(
      <PokemonListCard
        pokemon={buildPokemon()}
        isFavorite
        onOpen={() => {}}
      />,
    );

    expect(screen.getByLabelText("Favorito")).toBeOnTheScreen();
  });

  it("não exibe o indicador de favorito quando isFavorite é false", async () => {
    await renderWithToast(
      <PokemonListCard
        pokemon={buildPokemon()}
        isFavorite={false}
        onOpen={() => {}}
      />,
    );

    expect(screen.queryByLabelText("Favorito")).toBeNull();
  });

  it("chama onOpen ao pressionar o card", async () => {
    const onOpen = jest.fn();

    await renderWithToast(
      <PokemonListCard
        pokemon={buildPokemon()}
        isFavorite={false}
        onOpen={onOpen}
      />,
    );

    fireEvent.press(screen.getByText("Pikachu"));

    expect(onOpen).toHaveBeenCalledTimes(1);
  });
});
