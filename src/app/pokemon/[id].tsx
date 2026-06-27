import { usePokemonDetailModel } from "@/screens/pokemon-detail/pokemon-model";
import { PokemonDetailView } from "@/screens/pokemon-detail/pokemon-view";

export default function PokemonDetailScreen() {
  const modelData = usePokemonDetailModel();

  return <PokemonDetailView {...modelData} />;
}
