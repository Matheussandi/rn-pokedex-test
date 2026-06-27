import { Stack } from "expo-router";

export default function PokemonLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#FFFFFF" },
        headerTitleStyle: { fontWeight: "600", color: "#111827" },
        headerTintColor: "#111827",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Pokédex" }} />
      <Stack.Screen name="[id]" options={{ title: "Detalhe", headerBackTitle: "Voltar" }} />
    </Stack>
  );
}
