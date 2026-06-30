import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { colors } from "@/lib/theme";

type ErrorStateProps = {
  title: string;
  message: string;
  onRetry: () => void;
  retryLabel?: string;
};

export function ErrorState({
  title,
  message,
  onRetry,
  retryLabel = "Tentar novamente",
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <AppText variant="body1" bold>
        {title}
      </AppText>
      <AppText variant="body3" color="grey" style={styles.message}>
        {message}
      </AppText>
      <Pressable style={styles.retryButton} onPress={onRetry}>
        <AppText variant="body3" color="white" bold>
          {retryLabel}
        </AppText>
      </Pressable>
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
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.lilac,
  },
});
