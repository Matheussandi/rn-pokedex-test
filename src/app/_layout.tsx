import { useEffect } from "react";

import { ApolloProvider } from "@apollo/client/react";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";

import * as SplashScreen from "expo-splash-screen";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ToastProvider } from "@/components/ui";
import { apolloClient } from "@/graphql/client";
import { FavoritesProvider } from "@/contexts/favorites";

import { colors, fontFamily } from "@/lib/theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ToastProvider>
        <FavoritesProvider>
          <StatusBar style="dark" />
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
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="pokemon" options={{ headerShown: false }} />
          <Stack.Screen name="stats" options={{ title: "Stats" }} />
          </Stack>
        </FavoritesProvider>
      </ToastProvider>
    </ApolloProvider>
  );
}
