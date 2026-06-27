import { ApolloProvider } from "@apollo/client/react";

import { Stack } from "expo-router";

import { apolloClient } from "@/graphql/client";

export default function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTitleStyle: { fontWeight: "600", color: "#111827" },
          headerTintColor: "#111827",
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="pokemon" options={{ headerShown: false }} />
        <Stack.Screen name="stats" options={{ title: "Stats" }} />
      </Stack>
    </ApolloProvider>
  );
}
