import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { PokemonDetailQuery } from "@/graphql/generated/graphql";
import {
  capitalizeName,
  formatPokemonId,
  getPokemonImageUrl,
} from "@/lib/pokemon-image";

type Pokemon = NonNullable<PokemonDetailQuery["pokemon"][number]>;

type PokemonDetailViewProps = {
  pokemon: Pokemon | null;
  loading: boolean;
  error: Error | undefined;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onRetry: () => void;
};

export function PokemonDetailView({
  pokemon,
  loading,
  error,
  isFavorite,
  onToggleFavorite,
  onRetry,
}: PokemonDetailViewProps) {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#E3350D" />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Pokémon não encontrado</Text>
        <Text style={styles.helperText}>
          Não foi possível carregar os detalhes.
        </Text>
        <Pressable style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  const types = pokemon.pokemontypes
    .map((entry) => entry.type?.name)
    .filter(Boolean)
    .map((name) => capitalizeName(name!))
    .join(", ");

  const sprite = pokemon.pokemonsprites[0]?.sprites;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: getPokemonImageUrl(pokemon.id, sprite as never) }}
          style={styles.sprite}
          contentFit="contain"
        />
        <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>
        <Text style={styles.name}>{capitalizeName(pokemon.name)}</Text>
        <Text style={styles.types}>{types || "Sem tipo"}</Text>
        <Pressable
          style={[styles.favoriteButton, isFavorite && styles.favoriteActive]}
          onPress={onToggleFavorite}
        >
          <Ionicons
            name={isFavorite ? "star" : "star-outline"}
            size={18}
            color="#92400E"
          />
          <Text style={styles.favoriteButtonText}>
            {isFavorite ? "Favorito" : "Adicionar aos favoritos"}
          </Text>
        </Pressable>
      </View>

      <Section title="Informações">
        <InfoRow label="Altura" value={`${pokemon.height ?? 0} dm`} />
        <InfoRow label="Peso" value={`${pokemon.weight ?? 0} hg`} />
        <InfoRow
          label="Experiência base"
          value={String(pokemon.base_experience ?? "-")}
        />
        <InfoRow label="Ordem" value={String(pokemon.order ?? "-")} />
        <InfoRow
          label="Padrão"
          value={pokemon.is_default ? "Sim" : "Não"}
        />
      </Section>

      <Section title="Stats base">
        {pokemon.pokemonstats.map((stat) => (
          <InfoRow
            key={stat.stat?.name ?? stat.base_stat}
            label={capitalizeName(stat.stat?.name ?? "stat")}
            value={String(stat.base_stat)}
          />
        ))}
      </Section>

      <Section title="Habilidades">
        {pokemon.pokemonabilities.map((entry) => (
          <InfoRow
            key={`${entry.ability?.name}-${entry.is_hidden}`}
            label={capitalizeName(entry.ability?.name ?? "desconhecida")}
            value={entry.is_hidden ? "Oculta" : "Normal"}
          />
        ))}
      </Section>

      {pokemon.pokemonspecy ? (
        <Section title="Espécie">
          <InfoRow
            label="Taxa de captura"
            value={String(pokemon.pokemonspecy.capture_rate ?? "-")}
          />
          <InfoRow
            label="Lendário"
            value={pokemon.pokemonspecy.is_legendary ? "Sim" : "Não"}
          />
          <InfoRow
            label="Mítico"
            value={pokemon.pokemonspecy.is_mythical ? "Sim" : "Não"}
          />
        </Section>
      ) : null}
    </ScrollView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
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
  header: {
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 8,
  },
  sprite: {
    width: 160,
    height: 160,
  },
  id: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  types: {
    fontSize: 16,
    color: "#6B7280",
  },
  favoriteButton: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  favoriteActive: {
    backgroundColor: "#FEF3C7",
  },
  favoriteButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#92400E",
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  sectionCard: {
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  infoLabel: {
    fontSize: 15,
    color: "#374151",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  helperText: {
    marginTop: 8,
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
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
