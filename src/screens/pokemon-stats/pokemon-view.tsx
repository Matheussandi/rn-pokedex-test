import { StyleSheet, View } from "react-native";

import { StatCard } from "@/components/pokemon-stats";
import { ErrorState, Loading } from "@/components/ui";

import { usePokemonStatsModel } from "./pokemon-model";

import { formatPercentage } from "@/utils/format";

type PokemonStatsViewProps = ReturnType<typeof usePokemonStatsModel>;

export function PokemonStatsView(props: PokemonStatsViewProps) {
  const { stats, loading, error, refetch } = props;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorState
        title="Erro ao carregar stats"
        message="Não foi possível buscar os dados agregados."
        onRetry={refetch}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatCard
        label="Total de Pokémon"
        value={String(stats.total)}
        description="Quantidade registrada na PokéAPI"
      />
      <StatCard
        label="Taxa de lendários"
        value={formatPercentage(stats.legendaryRate)}
        description={`${stats.legendary} lendários de ${stats.total}`}
      />
      <StatCard
        label="Tipos distintos"
        value={String(stats.typesCount)}
        description="Categorias elementais disponíveis"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
    gap: 16,
  },
});
