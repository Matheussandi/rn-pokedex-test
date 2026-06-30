export const colors = {
  black: "#272727",
  white: "#FFFFFF",
  grey: "#919191",
  lightGrey: "#E7E7E8",
  semiGrey: "#F4F5F4",
  red: "#FA6555",
  green: "#41D168",
  blue: "#0055D4",
  lilac: "#6C79DB",
} as const;

export type ThemeColor = keyof typeof colors;

export const POKEMON_TYPE_COLORS = {
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#FA6C6C",
  water: "#6890F0",
  grass: "#48CFB2",
  electric: "#FFCE4B",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
} as const;

export type PokemonTypeName = keyof typeof POKEMON_TYPE_COLORS;

export const fontFamily = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  bold: "Inter_700Bold",
} as const;

export const textVariants = {
  title: { fontSize: 32, lineHeight: 44, fontFamily: fontFamily.bold },
  body1: { fontSize: 18, lineHeight: 22, fontFamily: fontFamily.medium },
  body2: { fontSize: 16, lineHeight: 22, fontFamily: fontFamily.medium },
  body3: { fontSize: 14, lineHeight: 18, fontFamily: fontFamily.medium },
  input: { fontSize: 14, lineHeight: 18, fontFamily: fontFamily.regular },
  caption: { fontSize: 12, lineHeight: 18, fontFamily: fontFamily.medium },
} as const;

export type TextVariant = keyof typeof textVariants;

export const HEADER_HEIGHT = 64;
export const POKEMON_SUMMARY_HEIGHT = 360;
export const CARD_HEIGHT = 110;

export const theme = {
  colors,
  fontFamily,
  textVariants,
} as const;
