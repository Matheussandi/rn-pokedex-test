import { capitalizeName } from "./pokemon-image";

type PokemonTypeEntry = { type?: { name: string } | null };

export function formatYesNo(value: boolean): string {
  return value ? "Yes" : "No";
}

export function formatHeight(decimeters: number | null | undefined): string {
  return `${decimeters ?? 0} dm`;
}

export function formatWeight(hectograms: number | null | undefined): string {
  return `${hectograms ?? 0} hg`;
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatPokemonTypes(
  entries: PokemonTypeEntry[],
  options?: { capitalize?: boolean; fallback?: string },
): string {
  const names = entries
    .map((entry) => entry.type?.name)
    .filter((name): name is string => Boolean(name));

  const labels = options?.capitalize ? names.map(capitalizeName) : names;
  return labels.length > 0 ? labels.join(", ") : (options?.fallback ?? "Sem tipo");
}
