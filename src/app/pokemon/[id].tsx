import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable } from "react-native";

import { getPrimaryTypeColor } from "@/lib/color-utils";
import { colors, fontFamily } from "@/lib/theme";
import { usePokemonDetailModel } from "@/screens/pokemon-detail/pokemon-model";
import { PokemonDetailView } from "@/screens/pokemon-detail/pokemon-view";
import { capitalizeName } from "@/utils/pokemon-image";

export default function PokemonDetailScreen() {
  const modelData = usePokemonDetailModel();

  const { pokemon, loading, error, isFavorite, toggleFavorite } = modelData;

  const isLoaded = !loading && !error && pokemon;
  const typeColor = isLoaded
    ? getPrimaryTypeColor(pokemon.pokemontypes)
    : colors.white;

  return (
    <>
      <Stack.Screen
        options={{
          title: isLoaded ? capitalizeName(pokemon.name) : "Detalhe",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: typeColor },
          headerTintColor: isLoaded ? colors.white : colors.black,
          headerTitleStyle: {
            fontFamily: fontFamily.bold,
            color: isLoaded ? colors.white : colors.black,
          },
          headerRight: isLoaded
            ? () => (
                <Pressable
                  onPress={toggleFavorite}
                  hitSlop={8}
                  style={{ marginRight: 4 }}
                >
                  <Ionicons
                    name={isFavorite ? "star" : "star-outline"}
                    size={22}
                    color={colors.white}
                  />
                </Pressable>
              )
            : undefined,
        }}
      />

      <StatusBar style={isLoaded ? "light" : "dark"} />
      
      <PokemonDetailView {...modelData} />
    </>
  );
}
