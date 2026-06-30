import { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import { Image } from "expo-image";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import {
  AppText,
  DetailTabs,
  ErrorState,
  Loading,
  Pokeball,
  PokemonTypes,
  ShadowContainer,
  StatBar,
  type DetailTab,
} from "@/components/ui";
import { getPrimaryTypeColor, withOpacity } from "@/lib/color-utils";
import { colors } from "@/lib/theme";

import type { usePokemonDetailModel } from "./pokemon-model";

import {
  formatHeight,
  formatWeight,
  formatYesNo,
} from "@/utils/format";
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

function SpinningPokeball() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 8000, easing: Easing.linear }),
      -1,
      false,
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.spinningPokeball, animatedStyle]}>
      <Pokeball width={220} height={220} color={withOpacity(colors.white, "20")} />
    </Animated.View>
  );
}

type DetailPokemon = NonNullable<
  ReturnType<typeof usePokemonDetailModel>["pokemon"]
>;

function AboutTab({
  pokemon,
  flavorText,
}: {
  pokemon: DetailPokemon;
  flavorText: string | null;
}) {
  return (
    <View style={styles.aboutContent}>
      {flavorText ? (
        <View style={styles.section}>
          <AppText variant="body1" bold>
            Description
          </AppText>
          <AppText variant="body3">{flavorText}</AppText>
        </View>
      ) : null}

      <View style={styles.metricsRow}>
        <ShadowContainer style={styles.metricCard}>
          <AppText variant="body3" color="grey">
            Height
          </AppText>
          <AppText variant="body1" bold>
            {formatHeight(pokemon.height)}
          </AppText>
        </ShadowContainer>
        <ShadowContainer style={styles.metricCard}>
          <AppText variant="body3" color="grey">
            Weight
          </AppText>
          <AppText variant="body1" bold>
            {formatWeight(pokemon.weight)}
          </AppText>
        </ShadowContainer>
      </View>

      <View style={styles.section}>
        <AppText variant="body1" bold>
          Training
        </AppText>
        <InfoRow
          label="Base experience"
          value={String(pokemon.base_experience ?? "-")}
        />
      </View>

      <View style={styles.section}>
        <AppText variant="body1" bold>
          Abilities
        </AppText>
        {pokemon.pokemonabilities.map((entry) => (
          <InfoRow
            key={`${entry.ability?.name}-${entry.is_hidden}`}
            label={entry.ability?.name ?? "unknown"}
            value={entry.is_hidden ? "Hidden" : "Normal"}
          />
        ))}
      </View>

      {pokemon.pokemonspecy ? (
        <View style={styles.section}>
          <AppText variant="body1" bold>
            Species
          </AppText>
          <InfoRow
            label="Capture rate"
            value={String(pokemon.pokemonspecy.capture_rate ?? "-")}
          />
          <InfoRow
            label="Legendary"
            value={formatYesNo(pokemon.pokemonspecy.is_legendary)}
          />
          <InfoRow
            label="Mythical"
            value={formatYesNo(pokemon.pokemonspecy.is_mythical)}
          />
        </View>
      ) : null}
    </View>
  );
}

function StatsTab({
  stats,
}: {
  stats: DetailPokemon["pokemonstats"];
}) {
  return (
    <View style={styles.statsContent}>
      {stats.map((stat) => (
        <StatBar
          key={stat.stat?.name ?? stat.base_stat}
          label={stat.stat?.name ?? "stat"}
          value={stat.base_stat}
        />
      ))}
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <AppText variant="body3" color="grey" style={styles.infoLabel}>
        {label}
      </AppText>
      <AppText variant="body3" bold style={styles.infoValue}>
        {value}
      </AppText>
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
  spinningPokeball: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
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
  aboutContent: {
    gap: 24,
  },
  section: {
    gap: 12,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 12,
  },
  metricCard: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: 16,
    minHeight: 72,
  },
  statsContent: {
    gap: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  infoLabel: {
    flex: 1,
  },
  infoValue: {
    flexShrink: 0,
  },
});
