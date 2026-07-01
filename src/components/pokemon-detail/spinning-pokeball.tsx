import { useEffect } from "react";

import { StyleSheet } from "react-native";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { Pokeball } from "@/components/ui";
import { withOpacity } from "@/lib/color-utils";
import { colors } from "@/lib/theme";

export function SpinningPokeball() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 8000, easing: Easing.linear }),
      -1,
      false,
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.spinningPokeball, animatedStyle]}>
      <Pokeball width={220} height={220} color={withOpacity(colors.white, "20")} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  spinningPokeball: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
