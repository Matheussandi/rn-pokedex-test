import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { FavoriteButton } from "@/components/ui";
import { colors, fontFamily } from "@/lib/theme";
import { usePokemonDetailModel } from "@/screens/pokemon-detail/pokemon-model";
import { PokemonDetailView } from "@/screens/pokemon-detail/pokemon-view";

export default function PokemonDetailScreen() {
  const modelData = usePokemonDetailModel();

  const { isLoaded, displayName, typeColor, isFavorite, toggleFavorite } =
    modelData;

  return (
    <>
      <Stack.Screen
        options={{
          title: displayName,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: typeColor },
          headerTintColor: isLoaded ? colors.white : colors.black,
          headerTitleStyle: {
            fontFamily: fontFamily.bold,
            color: isLoaded ? colors.white : colors.black,
          },
          headerRight: isLoaded
            ? () => (
                <FavoriteButton
                  isFavorite={isFavorite}
                  onToggle={toggleFavorite}
                />
              )
            : undefined,
        }}
      />

      <StatusBar style={isLoaded ? "light" : "dark"} />

      <PokemonDetailView {...modelData} />
    </>
  );
}
