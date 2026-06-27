import { PokemonStatsView } from "./pokemon-view";
import { usePokemonStatsModel } from "./pokemon-model";

export default function PokemonStatsScreen() {
  const model = usePokemonStatsModel();

  return (
    <PokemonStatsView
      stats={model.stats}
      loading={model.loading}
      error={model.error}
      onRetry={() => void model.refetch()}
    />
  );
}
