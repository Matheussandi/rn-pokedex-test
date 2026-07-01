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
} from "@/components/ui";

import { colors } from "@/lib/theme";

import type { usePokemonDetailModel } from "./pokemon-model";

type PokemonDetailViewProps = ReturnType<typeof usePokemonDetailModel>;

export function PokemonDetailView(props: PokemonDetailViewProps) {
  const {
    pokemon,
    loading,
    error,
    refetch,
    activeTab,
    setActiveTab,
    typeColor,
    formattedId,
    imageUrl,
    flavorText,
  } = props;

  const { width } = useWindowDimensions();
  const tabWidth = (width - 48) / 2;

  if (loading) {
    return <Loading />;
  }

  if (error || !pokemon || !formattedId || !imageUrl) {
    return (
      <ErrorState
        title="Erro ao carregar detalhes"
        message="Não foi possível carregar os detalhes."
        onRetry={() => void refetch()}
      />
    );
  }

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
              {formattedId}
            </AppText>
          </View>

          <View style={styles.spriteWrap}>
            <SpinningPokeball />
            <Image
              source={{ uri: imageUrl }}
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
