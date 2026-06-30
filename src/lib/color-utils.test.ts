import {
  getColorByPokemonType,
  getPrimaryTypeColor,
  withOpacity,
} from "./color-utils";
import { colors } from "./theme";

describe("withOpacity", () => {
  it("adiciona sufixo de opacidade hex", () => {
    expect(withOpacity(colors.white, "30")).toBe("#FFFFFF30");
    expect(withOpacity(colors.black, "60")).toBe("#27272760");
  });
});

describe("getColorByPokemonType", () => {
  it("retorna cor para tipo conhecido", () => {
    expect(getColorByPokemonType("fire")).toBe("#FA6C6C");
    expect(getColorByPokemonType("Water")).toBe("#6890F0");
  });

  it("usa fallback normal para tipo desconhecido", () => {
    expect(getColorByPokemonType("unknown")).toBe("#A8A878");
  });
});

describe("getPrimaryTypeColor", () => {
  it("usa a primeira entrada de tipo", () => {
    expect(
      getPrimaryTypeColor([{ type: { name: "grass" } }, { type: { name: "poison" } }]),
    ).toBe("#48CFB2");
  });

  it("usa fallback normal quando vazio", () => {
    expect(getPrimaryTypeColor([])).toBe("#A8A878");
  });
});
