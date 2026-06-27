import { ActivityIndicator, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { colors } from "@/lib/theme";

type LoadingProps = {
  message?: string;
};

export function Loading({ message }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.grey} />
      {message ? (
        <AppText variant="body3" color="grey" style={styles.message}>
          {message}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: colors.white,
  },
  message: {
    marginTop: 8,
    textAlign: "center",
  },
});
