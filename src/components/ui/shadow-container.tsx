import { StyleSheet, View, type ViewProps } from "react-native";

import { colors } from "@/lib/theme";

type ShadowContainerProps = ViewProps & {
  children: React.ReactNode;
};

export function ShadowContainer({ children, style, ...rest }: ShadowContainerProps) {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
