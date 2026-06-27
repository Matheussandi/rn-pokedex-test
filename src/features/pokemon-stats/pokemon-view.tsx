import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Stats = {
  total: number;
  legendary: number;
  typesCount: number;
  legendaryRate: number;
};

type PokemonStatsViewProps = {
  stats: Stats;
  loading: boolean;
  error: Error | undefined;
  onRetry: () => void;
};

export function PokemonStatsView({
  stats,
  loading,
  error,
  onRetry,
}: PokemonStatsViewProps) {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#E3350D" />
        <Text style={styles.helperText}>Carregando estatísticas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Erro ao carregar stats</Text>
        <Text style={styles.helperText}>
          Não foi possível buscar os dados agregados.
        </Text>
        <Pressable style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </Pressable>
      </View>
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
        value={`${stats.legendaryRate.toFixed(1)}%`}
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

function StatCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
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
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F9FAFB",
  },
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 8,
  },
  cardLabel: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
  },
  cardValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
  },
  cardDescription: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  helperText: {
    marginTop: 8,
    fontSize: 15,
    color: "#6B7280",
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#E3350D",
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
