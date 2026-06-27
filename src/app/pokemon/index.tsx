import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { Pressable, View } from "react-native";

import { usePokemonListModel } from "@/features/pokemon-list/pokemon-model";
import { PokemonListView } from "@/features/pokemon-list/pokemon-view";

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
                  color="#111827"
                />
              </Pressable>
              <Pressable onPress={modelData.openFilterModal}>
                <Ionicons name="funnel-outline" size={22} color="#111827" />
              </Pressable>
            </View>
          ),
        }}
      />

      <PokemonListView {...modelData} />
    </>
  );
}
