import React from "react";
import { SafeAreaView, StyleProp, ViewStyle } from "react-native";
import useResponsive from "@/hooks/useResponsive";

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Base page wrapper that adds safe-area handling and default horizontal padding.
 * Use this instead of a bare `View` at the top level of your screens.
 */
export default function Screen({ children, style }: ScreenProps) {
  const r = useResponsive();

  return (
    <SafeAreaView style={[{ flex: 1, paddingHorizontal: r.vw(4) }, style]}>
      {children}
    </SafeAreaView>
  );
}
