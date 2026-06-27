import { PokemonDetailView } from "./pokemon-view";
import { usePokemonDetailModel } from "./pokemon-model";

export default function PokemonDetailScreen() {
  const model = usePokemonDetailModel();

  return (
    <PokemonDetailView
      pokemon={model.pokemon}
      loading={model.loading}
      error={model.error}
      isFavorite={model.isFavorite}
      onToggleFavorite={model.toggleFavorite}
      onRetry={() => void model.refetch()}
    />
  );
}
