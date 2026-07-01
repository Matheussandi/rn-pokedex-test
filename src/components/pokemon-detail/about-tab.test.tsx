import { render, screen } from "@testing-library/react-native";

import type { GetPokemonDetailQuery } from "@/graphql/generated/graphql";

import { AboutTab } from "./about-tab";

type DetailPokemon = NonNullable<GetPokemonDetailQuery["pokemon"][number]>;

function buildPokemon(
  overrides: Partial<DetailPokemon> = {},
): DetailPokemon {
  return {
    id: 25,
    name: "pikachu",
    height: 4,
    weight: 60,
    base_experience: 112,
    order: 35,
    is_default: true,
    pokemontypes: [{ type: { name: "electric" } }],
    pokemonabilities: [
      { is_hidden: false, ability: { name: "static" } },
      { is_hidden: true, ability: { name: "lightning-rod" } },
    ],
    pokemonstats: [],
    pokemonspecy: {
      capture_rate: 190,
      is_legendary: false,
      is_mythical: false,
      flavor_pt: [],
      flavor_en: [],
    },
    pokemonsprites: [],
    ...overrides,
  };
}

describe("AboutTab", () => {
  it("exibe a descrição quando há flavor text", async () => {
    await render(
      <AboutTab pokemon={buildPokemon()} flavorText="Um Pokémon elétrico." />,
    );

    expect(screen.getByText("Descrição")).toBeOnTheScreen();
    expect(screen.getByText("Um Pokémon elétrico.")).toBeOnTheScreen();
  });

  it("oculta a seção de descrição quando flavorText é null", async () => {
    await render(<AboutTab pokemon={buildPokemon()} flavorText={null} />);

    expect(screen.queryByText("Descrição")).toBeNull();
  });

  it("renderiza as habilidades com indicador de oculta/normal", async () => {
    await render(<AboutTab pokemon={buildPokemon()} flavorText={null} />);

    expect(screen.getByText("static")).toBeOnTheScreen();
    expect(screen.getByText("lightning-rod")).toBeOnTheScreen();
    expect(screen.getByText("Oculta")).toBeOnTheScreen();
    expect(screen.getByText("Normal")).toBeOnTheScreen();
  });

  it("renderiza a seção de espécie quando há pokemonspecy", async () => {
    await render(<AboutTab pokemon={buildPokemon()} flavorText={null} />);

    expect(screen.getByText("Espécie")).toBeOnTheScreen();
    expect(screen.getByText("Taxa de captura")).toBeOnTheScreen();
    expect(screen.getByText("190")).toBeOnTheScreen();
  });

  it("oculta a seção de espécie quando pokemonspecy é null", async () => {
    await render(
      <AboutTab
        pokemon={buildPokemon({ pokemonspecy: null })}
        flavorText={null}
      />,
    );

    expect(screen.queryByText("Espécie")).toBeNull();
  });
});
