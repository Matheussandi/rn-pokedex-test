import {
  formatHeight,
  formatPercentage,
  formatPokemonTypes,
  formatWeight,
  formatYesNo,
} from "./format";

describe("formatYesNo", () => {
  it("retorna Sim para true", () => {
    expect(formatYesNo(true)).toBe("Sim");
  });

  it("retorna Não para false", () => {
    expect(formatYesNo(false)).toBe("Não");
  });
});

describe("formatHeight", () => {
  it("formata altura em decímetros", () => {
    expect(formatHeight(7)).toBe("7 dm");
  });

  it("usa 0 quando valor é null", () => {
    expect(formatHeight(null)).toBe("0 dm");
  });

  it("usa 0 quando valor é undefined", () => {
    expect(formatHeight(undefined)).toBe("0 dm");
  });
});

describe("formatWeight", () => {
  it("formata peso em hectogramas", () => {
    expect(formatWeight(69)).toBe("69 hg");
  });

  it("usa 0 quando valor é null", () => {
    expect(formatWeight(null)).toBe("0 hg");
  });

  it("usa 0 quando valor é undefined", () => {
    expect(formatWeight(undefined)).toBe("0 hg");
  });
});

describe("formatPercentage", () => {
  it("formata com uma casa decimal por padrão", () => {
    expect(formatPercentage(6.345)).toBe("6.3%");
  });

  it("aceita número de casas decimais customizado", () => {
    expect(formatPercentage(6.34, 2)).toBe("6.34%");
  });
});

describe("formatPokemonTypes", () => {
  it("retorna fallback padrão quando array está vazio", () => {
    expect(formatPokemonTypes([])).toBe("Sem tipo");
  });

  it("usa fallback customizado quando array está vazio", () => {
    expect(formatPokemonTypes([], { fallback: "Desconhecido" })).toBe(
      "Desconhecido",
    );
  });

  it("capitaliza tipos quando solicitado", () => {
    expect(
      formatPokemonTypes(
        [{ type: { name: "fire" } }, { type: { name: "flying" } }],
        { capitalize: true },
      ),
    ).toBe("Fire, Flying");
  });

  it("filtra entradas com tipo nulo", () => {
    expect(
      formatPokemonTypes([
        { type: { name: "water" } },
        { type: null },
        { type: undefined },
      ]),
    ).toBe("water");
  });
});
