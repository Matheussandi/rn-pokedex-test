import { usePokemonDetailModel } from "@/features/pokemon-detail/pokemon-model";
import { PokemonDetailView } from "@/features/pokemon-detail/pokemon-view";

export default function PokemonDetailScreen() {
  const modelData = usePokemonDetailModel();

  return <PokemonDetailView {...modelData} />;
}
