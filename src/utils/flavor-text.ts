type FlavorTextEntry = { flavor_text?: string | null } | null;

type SpeciesWithFlavor = {
  flavor_pt?: FlavorTextEntry[] | null;
  flavor_en?: FlavorTextEntry[] | null;
} | null;

export function normalizeFlavorText(text: string): string {
  return text
    .replace(/\f/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getPokemonFlavorText(species: SpeciesWithFlavor): string | null {
  const pt = species?.flavor_pt?.[0]?.flavor_text;
  if (pt) {
    return normalizeFlavorText(pt);
  }

  const en = species?.flavor_en?.[0]?.flavor_text;
  if (en) {
    return normalizeFlavorText(en);
  }

  return null;
}
