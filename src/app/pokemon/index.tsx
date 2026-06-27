import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { Pressable, View } from "react-native";

import { usePokemonListModel } from "@/screens/pokemon-list/pokemon-model";
import { PokemonListView } from "@/screens/pokemon-list/pokemon-view";
import { colors } from "@/lib/theme";

export default function PokemonListScreen() {
  const modelData = usePokemonListModel();

  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 16, marginRight: 4 }}>
              <Pressable onPress={() => router.push("/stats")}>
                <Ionicons
                  name="stats-chart-outline"
                  size={22}
                  color={colors.black}
                />
              </Pressable>
              <Pressable onPress={modelData.openFilterModal}>
                <Ionicons name="funnel-outline" size={22} color={colors.black} />
              </Pressable>
            </View>
          ),
        }}
      />

      <PokemonListView {...modelData} />
    </>
  );
}
