import { usePokemonStatsModel } from "@/features/pokemon-stats/pokemon-model";
import { PokemonStatsView } from "@/features/pokemon-stats/pokemon-view";

export default function PokemonStatsScreen() {
  const modelData = usePokemonStatsModel();

  return <PokemonStatsView {...modelData} />;
}
