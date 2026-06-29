import { Image, type ImageStyle, StyleSheet, View, type ViewStyle } from "react-native";

import { withOpacity } from "@/lib/color-utils";
import { colors } from "@/lib/theme";

const pokeballSource = require("../../../assets/pokeball.png");

type PokeballProps = {
  width: number;
  height: number;
  color?: string;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
};

export function Pokeball({
  width,
  height,
  color = withOpacity(colors.white, "20"),
  style,
  imageStyle,
}: PokeballProps) {
  return (
    <View style={[styles.container, { width, height }, style]}>
      <Image
        source={pokeballSource}
        style={[{ width, height, tintColor: color }, imageStyle]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    alignItems: "center",
    justifyContent: "center",
  },
});
