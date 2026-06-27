import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const LOADING_COLOR = "#E3350D";

type LoadingProps = {
  message?: string;
};

export const Loading = ({ message }: LoadingProps) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={LOADING_COLOR} />
    {message ? <Text style={styles.message}>{message}</Text> : null}
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
  message: {
    marginTop: 8,
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
  },
});
