import React from "react";
import { View } from "react-native";
import useResponsive from "@/hooks/useResponsive";

interface SpacerProps {
  /**
   * Height of the spacer as a percentage of viewport height (vh).
   * Defaults to `2` (2% of the screen height).
   */
  size?: number;
}

/**
 * Simple vertical spacer that scales with screen size.
 */
export default function Spacer({ size = 2 }: SpacerProps) {
  const r = useResponsive();
  return <View style={{ height: r.vh(size) }} />;
}
