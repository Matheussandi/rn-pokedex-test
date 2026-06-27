import { useEffect } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import { Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";

import { usePokemonDetailModel } from "@/screens/pokemon-detail/pokemon-model";
import { PokemonDetailView } from "@/screens/pokemon-detail/pokemon-view";
import { getPrimaryTypeColor } from "@/lib/color-utils";
import { colors, fontFamily } from "@/lib/theme";
import { capitalizeName } from "@/utils/pokemon-image";

export default function PokemonDetailScreen() {
  const modelData = usePokemonDetailModel();
  const navigation = useNavigation();
  const { pokemon, loading, error, isFavorite, toggleFavorite } = modelData;

  useEffect(() => {
    if (loading || error || !pokemon) {
      navigation.setOptions({
        title: "Detalhe",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.white,
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: colors.black,
        headerTitleStyle: {
          fontFamily: fontFamily.bold,
          color: colors.black,
        },
        headerRight: undefined,
      });
      return;
    }

    const typeColor = getPrimaryTypeColor(pokemon.pokemontypes);

    navigation.setOptions({
      title: capitalizeName(pokemon.name),
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: typeColor,
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontFamily: fontFamily.bold,
        color: colors.white,
      },
      headerRight: () => (
        <Pressable onPress={toggleFavorite} hitSlop={8} style={{ marginRight: 4 }}>
          <Ionicons
            name={isFavorite ? "star" : "star-outline"}
            size={22}
            color={colors.white}
          />
        </Pressable>
      ),
    });
  }, [pokemon, loading, error, isFavorite, toggleFavorite, navigation]);

  return (
    <>
      <StatusBar style={pokemon && !loading && !error ? "light" : "dark"} />
      <PokemonDetailView {...modelData} />
    </>
  );
}
