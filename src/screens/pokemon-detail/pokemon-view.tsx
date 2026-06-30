import { useState } from "react";

import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import { Image } from "expo-image";

import {
  AboutTab,
  SpinningPokeball,
  StatsTab,
} from "@/components/pokemon-detail";

import {
  AppText,
  DetailTabs,
  ErrorState,
  Loading,
  PokemonTypes,
  type DetailTab,
} from "@/components/ui";

import { getPrimaryTypeColor } from "@/lib/color-utils";
import { colors } from "@/lib/theme";

import type { usePokemonDetailModel } from "./pokemon-model";

import { getPokemonFlavorText } from "@/utils/flavor-text";

import {
  formatPokemonId,
  getPokemonImageUrl,
  getPokemonSprite,
} from "@/utils/pokemon-image";

type PokemonDetailViewProps = ReturnType<typeof usePokemonDetailModel>;

export function PokemonDetailView(props: PokemonDetailViewProps) {
  const { pokemon, loading, error, refetch } = props;

  const { width } = useWindowDimensions();

  const [activeTab, setActiveTab] = useState<DetailTab>("about");

  const tabWidth = (width - 48) / 2;

  if (loading) {
    return <Loading />;
  }

  if (error || !pokemon) {
    return (
      <ErrorState
        title="Erro ao carregar detalhes"
        message="Não foi possível carregar os detalhes."
        onRetry={() => void refetch()}
      />
    );
  }

  const typeColor = getPrimaryTypeColor(pokemon.pokemontypes);
  const sprite = getPokemonSprite(pokemon.pokemonsprites);
  const flavorText = getPokemonFlavorText(pokemon.pokemonspecy);

  return (
    <View style={[styles.container, { backgroundColor: typeColor }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryTypes}>
              <PokemonTypes types={pokemon.pokemontypes} size="regular" />
            </View>
            <AppText variant="body2" color="white" bold style={styles.summaryId}>
              {formatPokemonId(pokemon.id)}
            </AppText>
          </View>

          <View style={styles.spriteWrap}>
            <SpinningPokeball />
            <Image
              source={{ uri: getPokemonImageUrl(pokemon.id, sprite) }}
              style={styles.sprite}
              contentFit="contain"
            />
          </View>
        </View>

        <View style={styles.detailsPanel}>
          <DetailTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabWidth={tabWidth}
          />

          <View style={styles.tabContent}>
            {activeTab === "about" ? (
              <AboutTab pokemon={pokemon} flavorText={flavorText} />
            ) : (
              <StatsTab stats={pokemon.pokemonstats} />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  summary: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  summaryRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  summaryTypes: {
    flex: 1,
    marginRight: 8,
  },
  summaryId: {
    flexShrink: 0,
  },
  spriteWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  sprite: {
    width: 256,
    height: 256,
    alignSelf: "center",
  },
  detailsPanel: {
    flexGrow: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 8,
  },
  tabContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
  },
});
