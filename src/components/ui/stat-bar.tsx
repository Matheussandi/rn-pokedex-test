import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { colors } from "@/lib/theme";

type StatBarProps = {
  label: string;
  value: number;
};

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Atk",
  defense: "Def",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const STAT_THRESHOLD = 50;
const MAX_STAT = 100;

export function StatBar({ label, value }: StatBarProps) {
  const displayLabel = STAT_LABELS[label] ?? label;
  const fillColor = value < STAT_THRESHOLD ? colors.red : colors.green;
  const fillWidth = `${Math.min((value / MAX_STAT) * 100, 100)}%`;

  return (
    <View style={styles.row}>
      <AppText variant="body3" color="grey" style={styles.label}>
        {displayLabel}
      </AppText>
      <AppText variant="body3" bold style={styles.value}>
        {value}
      </AppText>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: fillWidth as `${number}%`, backgroundColor: fillColor },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    width: 72,
  },
  value: {
    width: 32,
    textAlign: "right",
  },
  track: {
    flex: 1,
    height: 6,
    marginLeft: 12,
    backgroundColor: colors.lightGrey,
    borderRadius: 3,
    overflow: "hidden",
  },
  fill: {
    height: 6,
    borderRadius: 3,
  },
});
