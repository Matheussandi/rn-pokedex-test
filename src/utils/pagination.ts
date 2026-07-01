export function appendNewById<T extends { id: number }>(
  current: T[],
  incoming: T[],
): T[] {
  const existingIds = new Set(current.map((item) => item.id));
  const newItems = incoming.filter((item) => !existingIds.has(item.id));
  return [...current, ...newItems];
}
