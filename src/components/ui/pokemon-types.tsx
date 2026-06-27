import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { withOpacity } from "@/lib/color-utils";
import { colors } from "@/lib/theme";
import { capitalizeName } from "@/utils/pokemon-image";

type PokemonTypeEntry = { type?: { name: string } | null };

type PokemonTypesProps = {
  types: PokemonTypeEntry[];
  size?: "regular" | "small";
};

export function PokemonTypes({ types, size = "regular" }: PokemonTypesProps) {
  const isSmall = size === "small";

  return (
    <View style={[styles.container, isSmall && styles.containerSmall]}>
      {types.map((entry, index) => {
        const name = entry.type?.name;
        if (!name) return null;

        return (
          <View
            key={`${name}-${index}`}
            style={[styles.badge, isSmall ? styles.badgeSmall : styles.badgeRegular]}
          >
            <AppText
              variant="caption"
              color="white"
              bold
              style={isSmall ? styles.textSmall : undefined}
            >
              {capitalizeName(name)}
            </AppText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  containerSmall: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  badge: {
    backgroundColor: withOpacity(colors.white, "30"),
    borderRadius: 16,
  },
  badgeRegular: {
    paddingHorizontal: 28,
    paddingVertical: 6,
    marginRight: 8,
  },
  badgeSmall: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 4,
  },
  textSmall: {
    fontSize: 8,
    lineHeight: 10,
  },
});
