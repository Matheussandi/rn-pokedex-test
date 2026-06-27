import { PokemonListView } from "./pokemon-view";
import { usePokemonListModel } from "./pokemon-model";

export default function PokemonListScreen() {
  const model = usePokemonListModel();

  return (
    <PokemonListView
      pokemons={model.pokemons}
      types={model.types}
      searchText={model.searchText}
      selectedType={model.selectedType}
      isInitialLoading={model.isInitialLoading}
      isLoadingMore={model.isLoadingMore}
      isRefreshing={model.isRefreshing}
      error={model.error}
      onSearchChange={model.setSearchText}
      onTypeChange={model.setSelectedType}
      onLoadMore={model.loadMore}
      onRefresh={model.refresh}
      onRetry={() => void model.refetch()}
      onOpenDetail={model.openDetail}
      isFavorite={model.isFavorite}
      onToggleFavorite={model.toggleFavorite}
    />
  );
}
