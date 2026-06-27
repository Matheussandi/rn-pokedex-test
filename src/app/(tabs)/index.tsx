import { usePokemonListModel } from "@/features/pokemon-list/pokemon-model";
import { PokemonListView } from "@/features/pokemon-list/pokemon-view";

export default function PokemonListScreen() {
  const modelData = usePokemonListModel();

  return <PokemonListView {...modelData} />;
}
