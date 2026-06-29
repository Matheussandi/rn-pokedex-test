import { useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useToast } from "@/components/ui/toast";
import { triggerFavoriteHaptic } from "@/lib/haptics";
import { colors, POKEMON_TYPE_COLORS } from "@/lib/theme";

const FAVORITE_COLOR = POKEMON_TYPE_COLORS.electric;
const ERROR_MESSAGE = "Não foi possível salvar o favorito. Tente novamente.";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggle?: () => Promise<boolean>;
  readonly?: boolean;
  size?: number;
  inactiveColor?: string;
  style?: StyleProp<ViewStyle>;
};

export function FavoriteButton({
  isFavorite,
  onToggle,
  readonly = false,
  size = 22,
  inactiveColor = colors.white,
  style,
}: FavoriteButtonProps) {
  const { showToast } = useToast();
  const [scale] = useState(() => new Animated.Value(1));

  if (readonly && !isFavorite) {
    return null;
  }

  const iconColor = isFavorite ? FAVORITE_COLOR : inactiveColor;
  const iconName = isFavorite ? "star" : "star-outline";
  const accessibilityLabel = readonly
    ? "Favorito"
    : isFavorite
      ? "Remover dos favoritos"
      : "Favoritar Pokémon";

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.85,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 8,
      }),
    ]).start();
  };

  const handlePress = async () => {
    if (!onToggle) {
      return;
    }

    const wasFavorite = isFavorite;
    animatePress();

    const success = await onToggle();

    if (success && !wasFavorite) {
      await triggerFavoriteHaptic();
    }

    if (!success) {
      showToast(ERROR_MESSAGE);
    }
  };

  const icon = (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Ionicons name={iconName} size={size} color={iconColor} />
    </Animated.View>
  );

  if (readonly) {
    return (
      <View style={style} accessibilityLabel={accessibilityLabel}>
        {icon}
      </View>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      style={[styles.button, style]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 4,
  },
});
