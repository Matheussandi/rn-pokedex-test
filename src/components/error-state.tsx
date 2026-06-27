import { Pressable, StyleSheet, Text, View } from "react-native";

const PRIMARY_COLOR = "#E3350D";

type ErrorStateProps = {
  title: string;
  message: string;
  onRetry: () => void;
  retryLabel?: string;
};

export const ErrorState = ({
  title,
  message,
  onRetry,
  retryLabel = "Tentar novamente",
}: ErrorStateProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.message}>{message}</Text>
    <Pressable style={styles.retryButton} onPress={onRetry}>
      <Text style={styles.retryButtonText}>{retryLabel}</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  message: {
    marginTop: 8,
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: PRIMARY_COLOR,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
