import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { colors } from "@/lib/theme";
import { capitalizeName } from "@/utils/pokemon-image";

type StatBarProps = {
  label: string;
  value: number;
};

const STAT_THRESHOLD = 50;
const MAX_STAT = 100;

export function StatBar({ label, value }: StatBarProps) {
  const fillColor = value < STAT_THRESHOLD ? colors.red : colors.green;
  const fillWidth = `${Math.min((value / MAX_STAT) * 100, 100)}%`;

  return (
    <View style={styles.row}>
      <AppText variant="body3" color="grey" style={styles.label}>
        {capitalizeName(label)}
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
    marginBottom: 16,
  },
  label: {
    width: 100,
  },
  value: {
    width: 30,
    textAlign: "right",
  },
  track: {
    flex: 1,
    height: 3,
    marginLeft: 16,
    backgroundColor: colors.lightGrey,
    borderRadius: 2,
    overflow: "hidden",
  },
  fill: {
    height: 3,
    borderRadius: 2,
  },
});
