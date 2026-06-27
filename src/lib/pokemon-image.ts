type SpritesJson = {
  other?: {
    "official-artwork"?: {
      front_default?: string | null;
    };
  };
};

export function getPokemonImageUrl(
  id: number,
  sprites?: SpritesJson | null,
): string {
  const officialArtwork =
    sprites?.other?.["official-artwork"]?.front_default;

  if (officialArtwork) {
    return officialArtwork;
  }

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function capitalizeName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}
