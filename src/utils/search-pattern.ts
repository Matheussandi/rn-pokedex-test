export function buildSearchPattern(search: string): string {
  const trimmed = search.trim();
  return trimmed ? `%${trimmed}%` : "%";
}
