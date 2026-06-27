import {
  capitalizeName,
  formatPokemonId,
  getPokemonImageUrl,
  getPokemonSprite,
} from "./pokemon-image";

describe("getPokemonImageUrl", () => {
  it("retorna URL do official-artwork quando disponível", () => {
    const artworkUrl = "https://example.com/pikachu.png";
    const sprites = {
      other: {
        "official-artwork": {
          front_default: artworkUrl,
        },
      },
    };

    expect(getPokemonImageUrl(25, sprites)).toBe(artworkUrl);
  });

  it("retorna URL do CDN quando sprites não têm artwork", () => {
    expect(getPokemonImageUrl(25, null)).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    );
  });
});

describe("formatPokemonId", () => {
  it("formata ID com padding de 3 dígitos", () => {
    expect(formatPokemonId(1)).toBe("#001");
    expect(formatPokemonId(25)).toBe("#025");
    expect(formatPokemonId(150)).toBe("#150");
  });
});

describe("capitalizeName", () => {
  it("capitaliza a primeira letra", () => {
    expect(capitalizeName("pikachu")).toBe("Pikachu");
  });
});

describe("getPokemonSprite", () => {
  it("retorna null quando array está vazio", () => {
    expect(getPokemonSprite([])).toBeNull();
  });

  it("retorna sprites do primeiro item", () => {
    const sprites = {
      other: {
        "official-artwork": {
          front_default: "https://example.com/sprite.png",
        },
      },
    };

    expect(getPokemonSprite([{ sprites }])).toEqual(sprites);
  });
});
