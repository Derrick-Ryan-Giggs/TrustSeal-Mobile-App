import React from "react";
import { Text, TextProps, StyleProp, TextStyle } from "react-native";
import useResponsive from "@/hooks/useResponsive";

interface ResponsiveTextProps extends TextProps {
  /**
   * Base font size in the design mock (e.g. Figma). Will be scaled to the device width.
   */
  size: number;
  style?: StyleProp<TextStyle>;
}

/**
 * Drop-in replacement for `Text` that automatically scales `fontSize` responsively.
 */
export default function ResponsiveText({
  size,
  style,
  children,
  ...rest
}: ResponsiveTextProps) {
  const r = useResponsive();

  return (
    <Text style={[{ fontSize: r.fontScale(size) }, style]} {...rest}>
      {children}
    </Text>
  );
}
