import { ApolloProvider } from "@apollo/client/react";

import { Stack } from "expo-router";

import { apolloClient } from "@/graphql/client";

export default function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="pokemon/[id]" options={{ title: "Detalhe", headerBackTitle: "Voltar" }} />
      </Stack>
    </ApolloProvider>
  );
}
