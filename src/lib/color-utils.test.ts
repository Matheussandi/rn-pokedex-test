import {
  getColorByPokemonType,
  getPrimaryTypeColor,
  withOpacity,
} from "./color-utils";
import { colors } from "./theme";

describe("withOpacity", () => {
  it("appends hex opacity suffix", () => {
    expect(withOpacity(colors.white, "30")).toBe("#FFFFFF30");
    expect(withOpacity(colors.black, "60")).toBe("#27272760");
  });
});

describe("getColorByPokemonType", () => {
  it("returns color for known type", () => {
    expect(getColorByPokemonType("fire")).toBe("#FA6C6C");
    expect(getColorByPokemonType("Water")).toBe("#6890F0");
  });

  it("falls back to normal for unknown type", () => {
    expect(getColorByPokemonType("unknown")).toBe("#A8A878");
  });
});

describe("getPrimaryTypeColor", () => {
  it("uses first type entry", () => {
    expect(
      getPrimaryTypeColor([{ type: { name: "grass" } }, { type: { name: "poison" } }]),
    ).toBe("#48CFB2");
  });

  it("falls back to normal when empty", () => {
    expect(getPrimaryTypeColor([])).toBe("#A8A878");
  });
});
