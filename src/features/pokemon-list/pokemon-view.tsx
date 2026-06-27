import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import type { PokemonListItem } from "./pokemon-model";
import {
  capitalizeName,
  getPokemonImageUrl,
} from "@/lib/pokemon-image";

type PokemonListViewProps = {
  pokemons: PokemonListItem[];
  types: Array<{ id: number; name: string }>;
  searchText: string;
  selectedType: string | null;
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  isRefreshing: boolean;
  error: Error | undefined;
  onSearchChange: (text: string) => void;
  onTypeChange: (type: string | null) => void;
  onLoadMore: () => void;
  onRefresh: () => void;
  onRetry: () => void;
  onOpenDetail: (id: number) => void;
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
};

export function PokemonListView({
  pokemons,
  types,
  searchText,
  selectedType,
  isInitialLoading,
  isLoadingMore,
  isRefreshing,
  error,
  onSearchChange,
  onTypeChange,
  onLoadMore,
  onRefresh,
  onRetry,
  onOpenDetail,
  isFavorite,
  onToggleFavorite,
}: PokemonListViewProps) {
  if (isInitialLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#E3350D" />
        <Text style={styles.helperText}>Carregando Pokémon...</Text>
      </View>
    );
  }

  if (error && pokemons.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Não foi possível carregar</Text>
        <Text style={styles.helperText}>
          A API pode estar lenta ou indisponível. Tente novamente.
        </Text>
        <Pressable style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nome..."
        placeholderTextColor="#9CA3AF"
        value={searchText}
        onChangeText={onSearchChange}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        <FilterChip
          label="Todos"
          selected={selectedType === null}
          onPress={() => onTypeChange(null)}
        />
        {types.map((type) => (
          <FilterChip
            key={type.id}
            label={capitalizeName(type.name)}
            selected={selectedType === type.name}
            onPress={() => onTypeChange(type.name)}
          />
        ))}
      </ScrollView>

      <FlatList
        data={pokemons}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={
          pokemons.length === 0 ? styles.emptyList : styles.listContent
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.helperText}>Nenhum Pokémon encontrado.</Text>
          </View>
        }
        ListFooterComponent={
          isLoadingMore ? (
            <ActivityIndicator style={styles.footerLoader} color="#E3350D" />
          ) : null
        }
        renderItem={({ item }) => (
          <PokemonListCard
            pokemon={item}
            isFavorite={isFavorite(item.id)}
            onOpen={() => onOpenDetail(item.id)}
            onToggleFavorite={() => onToggleFavorite(item.id)}
          />
        )}
      />
    </View>
  );
}

function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

function PokemonListCard({
  pokemon,
  isFavorite,
  onOpen,
  onToggleFavorite,
}: {
  pokemon: PokemonListItem;
  isFavorite: boolean;
  onOpen: () => void;
  onToggleFavorite: () => void;
}) {
  const types = pokemon.pokemontypes
    .map((entry) => entry.type?.name)
    .filter(Boolean)
    .join(", ");

  const sprite = pokemon.pokemonsprites[0]?.sprites;

  return (
    <Pressable style={styles.card} onPress={onOpen}>
      <Image
        source={{ uri: getPokemonImageUrl(pokemon.id, sprite as never) }}
        style={styles.sprite}
        contentFit="contain"
      />
      <View style={styles.cardContent}>
        <Text style={styles.pokemonName}>{capitalizeName(pokemon.name)}</Text>
        <Text style={styles.pokemonMeta}>
          {types || "Sem tipo"} · {pokemon.height ?? 0}dm · {pokemon.weight ?? 0}hg
        </Text>
      </View>
      <Pressable onPress={onToggleFavorite} hitSlop={8}>
        <Ionicons
          name={isFavorite ? "star" : "star-outline"}
          size={22}
          color="#F59E0B"
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F9FAFB",
  },
  searchInput: {
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 16,
    color: "#111827",
  },
  filterRow: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  chipSelected: {
    backgroundColor: "#E3350D",
    borderColor: "#E3350D",
  },
  chipText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#FFFFFF",
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
    gap: 12,
  },
  emptyList: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 12,
  },
  sprite: {
    width: 56,
    height: 56,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  pokemonMeta: {
    fontSize: 13,
    color: "#6B7280",
  },
  footerLoader: {
    marginVertical: 16,
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
