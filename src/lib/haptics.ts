import { Platform } from "react-native";

import * as Haptics from "expo-haptics";

export async function triggerFavoriteHaptic() {
  if (Platform.OS === "web") {
    return;
  }

  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch {
    // Haptics indisponível neste dispositivo
  }
}
