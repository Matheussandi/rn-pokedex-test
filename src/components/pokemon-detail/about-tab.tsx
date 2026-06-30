import { StyleSheet, View } from "react-native";

import { AppText, ShadowContainer } from "@/components/ui";
import type { GetPokemonDetailQuery } from "@/graphql/generated/graphql";
import {
  formatHeight,
  formatWeight,
  formatYesNo,
} from "@/utils/format";

type DetailPokemon = NonNullable<GetPokemonDetailQuery["pokemon"][number]>;

type AboutTabProps = {
  pokemon: DetailPokemon;
  flavorText: string | null;
};

export function AboutTab({ pokemon, flavorText }: AboutTabProps) {
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
