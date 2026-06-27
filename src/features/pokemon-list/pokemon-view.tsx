import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Image } from "expo-image";

import { ErrorState } from "@/components/error-state";
import { Loading } from "@/components/loading";

import type { PokemonListItem, usePokemonListModel } from "./pokemon-model";

import { formatHeight, formatPokemonTypes, formatWeight } from "@/utils/format";

import {
  capitalizeName,
  getPokemonImageUrl,
  getPokemonSprite,
} from "@/utils/pokemon-image";

type PokemonListViewProps = ReturnType<typeof usePokemonListModel>;

export function PokemonListView(props: PokemonListViewProps) {
  const {
    pokemons,
    types,
    draftSearch,
    draftType,
    isInitialLoading,
    isLoadingMore,
    isRefreshing,
    error,
    setDraftSearch,
    setDraftType,
    clearFilters,
    applyFilters,
    loadMore,
    refresh,
    refetch,
    openDetail,
    isFavorite,
    toggleFavorite,
    isFilterModalVisible,
    closeFilterModal,
  } = props;

  if (isInitialLoading) {
    return <Loading />;
  }

  if (error && pokemons.length === 0) {
    return (
      <ErrorState
        title="Erro ao carregar Pokémon"
        message="A API pode estar lenta ou indisponível. Tente novamente."
        onRetry={refetch}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={isFilterModalVisible}
        statusBarTranslucent
        transparent
        animationType="slide"
        onRequestClose={closeFilterModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeFilterModal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtros</Text>
              <Pressable onPress={closeFilterModal} hitSlop={8}>
                <Ionicons name="close" size={24} color="#111827" />
              </Pressable>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por nome..."
              placeholderTextColor="#9CA3AF"
              value={draftSearch}
              onChangeText={setDraftSearch}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.typeRow}
            >
              <FilterChip
                label="Todos"
                selected={draftType === null}
                onPress={() => setDraftType(null)}
              />
              {types.map((type) => (
                <FilterChip
                  key={type.id}
                  label={capitalizeName(type.name)}
                  selected={draftType === type.name}
                  onPress={() => setDraftType(type.name)}
                />
              ))}
            </ScrollView>

            <View style={styles.modalActions}>
              <Pressable style={styles.clearButton} onPress={clearFilters}>
                <Text style={styles.clearButtonText}>Limpar</Text>
              </Pressable>
              <Pressable style={styles.applyButton} onPress={applyFilters}>
                <Text style={styles.applyButtonText}>Filtrar</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>

      <FlatList
        data={pokemons}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={
          pokemons.length === 0 ? styles.emptyList : styles.listContent
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
        onEndReached={loadMore}
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
            onOpen={() => openDetail(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
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
  const types = formatPokemonTypes(pokemon.pokemontypes);
  const sprite = getPokemonSprite(pokemon.pokemonsprites);

  return (
    <Pressable style={styles.card} onPress={onOpen}>
      <Image
        source={{ uri: getPokemonImageUrl(pokemon.id, sprite) }}
        style={styles.sprite}
        contentFit="contain"
      />
      <View style={styles.cardContent}>
        <Text style={styles.pokemonName}>{capitalizeName(pokemon.name)}</Text>
        <Text style={styles.pokemonMeta}>
          {types} · {formatHeight(pokemon.height)} · {formatWeight(pokemon.weight)}
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#F9FAFB",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F9FAFB",
  },
  searchInput: {
    marginHorizontal: 16,
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
  typeRow: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  modalActions: {
    gap: 12,
    paddingHorizontal: 16,
  },
  clearButton: {
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  applyButton: {
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#E3350D",
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
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
});
