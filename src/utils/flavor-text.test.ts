import { getPokemonFlavorText, normalizeFlavorText } from "./flavor-text";

describe("normalizeFlavorText", () => {
  it("remove form feeds e quebras de linha", () => {
    expect(normalizeFlavorText("Hello\fworld\n\n test")).toBe("Hello world test");
  });
});

describe("getPokemonFlavorText", () => {
  it("prioriza flavor text em inglês", () => {
    expect(
      getPokemonFlavorText({
        flavor_pt: [{ flavor_text: "Texto em português." }],
        flavor_en: [{ flavor_text: "English text." }],
      }),
    ).toBe("English text.");
  });

  it("usa inglês quando português está vazio", () => {
    expect(
      getPokemonFlavorText({
        flavor_pt: [],
        flavor_en: [{ flavor_text: "English text." }],
      }),
    ).toBe("English text.");
  });

  it("retorna null quando não há flavor text", () => {
    expect(getPokemonFlavorText(null)).toBeNull();
    expect(getPokemonFlavorText({ flavor_pt: [], flavor_en: [] })).toBeNull();
  });
});
