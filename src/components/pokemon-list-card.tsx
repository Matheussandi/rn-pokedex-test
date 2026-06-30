import { Pressable, StyleSheet, View } from "react-native";

import { Image } from "expo-image";

import { AppText, FavoriteButton, Pokeball, PokemonTypes } from "@/components/ui";
import type { ListPokemonQuery } from "@/graphql/generated/graphql";
import { getPrimaryTypeColor, getThemeColorWithOpacity } from "@/lib/color-utils";
import { CARD_HEIGHT } from "@/lib/theme";
import {
  capitalizeName,
  formatPokemonId,
  getPokemonImageUrl,
  getPokemonSprite,
} from "@/utils/pokemon-image";

export type PokemonListCardProps = {
  pokemon: ListPokemonQuery["pokemon"][number];
  isFavorite: boolean;
  onOpen: () => void;
};

export function PokemonListCard({
  pokemon,
  isFavorite,
  onOpen,
}: PokemonListCardProps) {
  const sprite = getPokemonSprite(pokemon.pokemonsprites);
  const backgroundColor = getPrimaryTypeColor(pokemon.pokemontypes);

  return (
    <Pressable
      style={[styles.card, { backgroundColor }]}
      onPress={onOpen}
    >
      <FavoriteButton
        readonly
        isFavorite={isFavorite}
        size={14}
        style={styles.favoriteIndicator}
      />

      <View style={styles.cardContent}>
        <AppText
          variant="body3"
          color="white"
          bold
          numberOfLines={1}
        >
          {capitalizeName(pokemon.name)}
        </AppText>

        <PokemonTypes types={pokemon.pokemontypes} size="small" />
      </View>

      <AppText variant="caption" style={styles.cardId}>
        {formatPokemonId(pokemon.id)}
      </AppText>

      <Image
        source={{ uri: getPokemonImageUrl(pokemon.id, sprite) }}
        style={styles.sprite}
        contentFit="contain"
      />

      <Pokeball
        width={80}
        height={80}
        style={styles.pokeball}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: CARD_HEIGHT,
    padding: 16,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  cardId: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 10,
    color: getThemeColorWithOpacity("black", "30"),
  },
  cardContent: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 28,
    gap: 4,
  },
  favoriteIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  sprite: {
    position: "absolute",
    right: 4,
    bottom: 4,
    width: 72,
    height: 72,
  },
  pokeball: {
    position: "absolute",
    right: -8,
    bottom: -8,
  },
});
