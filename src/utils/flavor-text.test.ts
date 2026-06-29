import { getPokemonFlavorText, normalizeFlavorText } from "./flavor-text";

describe("normalizeFlavorText", () => {
  it("removes form feeds and newlines", () => {
    expect(normalizeFlavorText("Hello\fworld\n\n test")).toBe("Hello world test");
  });
});

describe("getPokemonFlavorText", () => {
  it("prefers english flavor text", () => {
    expect(
      getPokemonFlavorText({
        flavor_pt: [{ flavor_text: "Texto em português." }],
        flavor_en: [{ flavor_text: "English text." }],
      }),
    ).toBe("English text.");
  });

  it("falls back to portuguese when english is missing", () => {
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
