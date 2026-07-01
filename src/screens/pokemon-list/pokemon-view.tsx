import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { PokemonListCard } from "@/components/pokemon-list-card";
import { AppText, Chip, ErrorState, Input, Loading } from "@/components/ui";
import { getThemeColorWithOpacity } from "@/lib/color-utils";
import { colors } from "@/lib/theme";
import { capitalizeName } from "@/utils/pokemon-image";

import type { usePokemonListModel } from "./pokemon-model";

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
        <View style={styles.modalOverlay}>
          <Pressable style={styles.backdrop} onPress={closeFilterModal} />
          <View style={styles.bottomFiller} pointerEvents="none" />
          <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
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
          </KeyboardAvoidingView>
        </View>
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
            isFavorite={isFavorite(item.id)}
            onOpen={() => openDetail(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: getThemeColorWithOpacity("black", "60"),
  },
  keyboardView: {
    width: "100%",
  },
  bottomFiller: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
    backgroundColor: colors.white,
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
  footerLoader: {
    marginVertical: 8,
  },
  helperText: {
    textAlign: "center",
  },
});
