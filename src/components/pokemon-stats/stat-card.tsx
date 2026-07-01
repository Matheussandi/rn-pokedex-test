import { StyleSheet, Text, View } from "react-native";

type StatCardProps = {
  label: string;
  value: string;
  description: string;
};

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 8,
  },
  cardLabel: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
  },
  cardValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
  },
  cardDescription: {
    fontSize: 14,
    color: "#9CA3AF",
  },
});
