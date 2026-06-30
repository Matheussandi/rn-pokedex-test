import { Pressable, StyleSheet } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { colors } from "@/lib/theme";

type ChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function Chip({ label, selected, onPress }: ChipProps) {
  return (
    <Pressable
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
    >
      <AppText
        variant="body3"
        color={selected ? "white" : "black"}
        style={styles.label}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  chipSelected: {
    backgroundColor: colors.lilac,
    borderColor: colors.lilac,
  },
  label: {
    fontWeight: "500",
  },
});
