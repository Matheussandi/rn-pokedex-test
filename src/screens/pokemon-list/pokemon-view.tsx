import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { Image } from "expo-image";

import {
  AppText,
  Chip,
  ErrorState,
  Input,
  Loading,
  Pokeball,
  PokemonTypes,
} from "@/components/ui";
import { getPrimaryTypeColor, getThemeColorWithOpacity } from "@/lib/color-utils";
import { CARD_HEIGHT, colors } from "@/lib/theme";

import type { PokemonListItem, usePokemonListModel } from "./pokemon-model";

import {
  capitalizeName,
  formatPokemonId,
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
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <AppText variant="body1" bold>
                Filtros
              </AppText>
              <Pressable onPress={closeFilterModal} hitSlop={8}>
                <Ionicons name="close" size={24} color={colors.black} />
              </Pressable>
            </View>

            <View style={styles.modalInputRow}>
              <Input
                placeholder="Buscar por nome..."
                value={draftSearch}
                onChangeText={setDraftSearch}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.typeRow}
            >
              <Chip
                label="Todos"
                selected={draftType === null}
                onPress={() => setDraftType(null)}
              />
              {types.map((type) => (
                <Chip
                  key={type.id}
                  label={capitalizeName(type.name)}
                  selected={draftType === type.name}
                  onPress={() => setDraftType(type.name)}
                />
              ))}
            </ScrollView>

            <View style={styles.modalActions}>
              <Pressable style={styles.clearButton} onPress={clearFilters}>
                <AppText variant="body3" bold>
                  Limpar
                </AppText>
              </Pressable>
              <Pressable style={styles.applyButton} onPress={applyFilters}>
                <AppText variant="body3" color="white" bold>
                  Filtrar
                </AppText>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <FlatList
        data={pokemons}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
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
            <AppText variant="body3" color="grey" style={styles.helperText}>
              Nenhum Pokémon encontrado.
            </AppText>
          </View>
        }
        ListFooterComponent={
          isLoadingMore ? (
            <ActivityIndicator
              style={styles.footerLoader}
              color={colors.lilac}
            />
          ) : null
        }
        renderItem={({ item }) => (
          <PokemonListCard
            pokemon={item}
            onOpen={() => openDetail(item.id)}
          />
        )}
      />
    </View>
  );
}

function PokemonListCard({
  pokemon,
  onOpen,
}: {
  pokemon: PokemonListItem;
  onOpen: () => void;
}) {
  const sprite = getPokemonSprite(pokemon.pokemonsprites);
  const backgroundColor = getPrimaryTypeColor(pokemon.pokemontypes);

  return (
    <Pressable
      style={[styles.card, { backgroundColor }]}
      onPress={onOpen}
    >
      <AppText variant="caption" style={styles.cardId}>
        {formatPokemonId(pokemon.id)}
      </AppText>

      <AppText variant="body3" color="white" bold numberOfLines={1}>
        {capitalizeName(pokemon.name)}
      </AppText>

      <PokemonTypes types={pokemon.pokemontypes} size="small" />

      <Image
        source={{ uri: getPokemonImageUrl(pokemon.id, sprite) }}
        style={styles.sprite}
        contentFit="contain"
      />

      <Pokeball
        width={80}
        height={80}
        style={styles.pokeball}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: getThemeColorWithOpacity("black", "60"),
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 16,
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  modalInputRow: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  typeRow: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 8,
  },
  modalActions: {
    gap: 12,
    paddingHorizontal: 24,
  },
  clearButton: {
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: colors.semiGrey,
    alignItems: "center",
  },
  applyButton: {
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: colors.lilac,
    alignItems: "center",
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  emptyList: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  columnWrapper: {
    gap: 10,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    height: CARD_HEIGHT,
    padding: 16,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  cardId: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 10,
    color: getThemeColorWithOpacity("black", "30"),
  },
  sprite: {
    position: "absolute",
    right: 4,
    bottom: 4,
    width: 72,
    height: 72,
  },
  pokeball: {
    position: "absolute",
    right: -8,
    bottom: -8,
  },
  footerLoader: {
    marginVertical: 8,
  },
  helperText: {
    textAlign: "center",
  },
});
