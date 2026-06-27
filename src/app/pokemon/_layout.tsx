import { Stack } from "expo-router";

import { colors, fontFamily } from "@/lib/theme";

export default function PokemonLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.white },
        headerTitleStyle: {
          fontFamily: fontFamily.bold,
          color: colors.black,
        },
        headerTintColor: colors.black,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Pokédex" }} />
      <Stack.Screen
        name="[id]"
        options={{ title: "Detalhe", headerBackTitle: "Voltar" }}
      />
    </Stack>
  );
}
