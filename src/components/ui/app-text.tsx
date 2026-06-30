import { Text, type TextProps, type TextStyle } from "react-native";

import {
  colors,
  fontFamily,
  textVariants,
  type TextVariant,
  type ThemeColor,
} from "@/lib/theme";

type AppTextProps = TextProps & {
  variant?: TextVariant;
  color?: ThemeColor;
  bold?: boolean;
};

export function AppText({
  variant = "body3",
  color = "black",
  bold = false,
  style,
  ...rest
}: AppTextProps) {
  const variantStyle = textVariants[variant];
  const textStyle: TextStyle = {
    ...variantStyle,
    color: colors[color],
    ...(bold ? { fontFamily: fontFamily.bold } : null),
  };

  return <Text style={[textStyle, style]} {...rest} />;
}
