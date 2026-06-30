import {
  POKEMON_TYPE_COLORS,
  type PokemonTypeName,
  colors,
} from "./theme";

export type OpacitySuffix = "20" | "30" | "40" | "60" | "75";

type PokemonTypeEntry = { type?: { name: string } | null };

export function withOpacity(hex: string, suffix: OpacitySuffix): string {
  return `${hex}${suffix}`;
}

export function getColorByPokemonType(type: string): string {
  const key = type.toLowerCase() as PokemonTypeName;
  return POKEMON_TYPE_COLORS[key] ?? POKEMON_TYPE_COLORS.normal;
}

export function getPrimaryTypeColor(entries: PokemonTypeEntry[]): string {
  const primaryType = entries[0]?.type?.name;
  if (!primaryType) {
    return POKEMON_TYPE_COLORS.normal;
  }
  return getColorByPokemonType(primaryType);
}

export function getThemeColorWithOpacity(
  colorKey: keyof typeof colors,
  suffix: OpacitySuffix,
): string {
  return withOpacity(colors[colorKey], suffix);
}
