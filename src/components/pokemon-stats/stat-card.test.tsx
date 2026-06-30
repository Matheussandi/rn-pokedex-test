import { render, screen } from "@testing-library/react-native";

import { StatCard } from "./stat-card";

describe("StatCard", () => {
  it("renderiza label, value e description", async () => {
    await render(
      <StatCard
        label="Total de Pokémon"
        value="151"
        description="Quantidade registrada na PokéAPI"
      />,
    );

    expect(screen.getByText("Total de Pokémon")).toBeOnTheScreen();
    expect(screen.getByText("151")).toBeOnTheScreen();
    expect(
      screen.getByText("Quantidade registrada na PokéAPI"),
    ).toBeOnTheScreen();
  });
});
