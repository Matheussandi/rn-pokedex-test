import { StyleSheet, View } from "react-native";

import { StatBar } from "@/components/ui";
import type { GetPokemonDetailQuery } from "@/graphql/generated/graphql";

type StatsTabProps = {
  stats: GetPokemonDetailQuery["pokemon"][number]["pokemonstats"];
};

export function StatsTab({ stats }: StatsTabProps) {
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

const styles = StyleSheet.create({
  statsContent: {
    gap: 4,
  },
});
