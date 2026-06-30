import { usePokemonStatsModel } from "@/screens/pokemon-stats/pokemon-model";
import { PokemonStatsView } from "@/screens/pokemon-stats/pokemon-view";

export default function PokemonStatsScreen() {
  const modelData = usePokemonStatsModel();

  return <PokemonStatsView {...modelData} />;
}
