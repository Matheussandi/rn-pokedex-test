import { getPokemonFlavorText, normalizeFlavorText } from "./flavor-text";

describe("normalizeFlavorText", () => {
  it("removes form feeds and newlines", () => {
    expect(normalizeFlavorText("Hello\fworld\n\n test")).toBe("Hello world test");
  });
});

describe("getPokemonFlavorText", () => {
  it("prefers portuguese flavor text", () => {
    expect(
      getPokemonFlavorText({
        flavor_pt: [{ flavor_text: "Texto em português." }],
        flavor_en: [{ flavor_text: "English text." }],
      }),
    ).toBe("Texto em português.");
  });

  it("falls back to english when portuguese is missing", () => {
    expect(
      getPokemonFlavorText({
        flavor_pt: [],
        flavor_en: [{ flavor_text: "English text." }],
      }),
    ).toBe("English text.");
  });

  it("returns null when no flavor text exists", () => {
    expect(getPokemonFlavorText(null)).toBeNull();
    expect(getPokemonFlavorText({ flavor_pt: [], flavor_en: [] })).toBeNull();
  });
});
