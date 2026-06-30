import { getThemeColorWithOpacity } from "@/lib/color-utils";
import { colors } from "@/lib/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

type InputProps = TextInputProps & {
  icon?: keyof typeof Ionicons.glyphMap;
};

export function Input({ icon = "search", style, ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name={icon}
        size={24}
        color={colors.black}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={getThemeColorWithOpacity("black", "75")}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    height: 48,
    paddingHorizontal: 24,
    backgroundColor: colors.semiGrey,
    borderRadius: 24,
  },
  icon: {
    marginRight: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "Inter_400Regular",
    color: colors.black,
    padding: 0,
  },
});
