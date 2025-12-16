import { StyleSheet } from "react-native";
import useResponsive from "@/hooks/useResponsive";

/**
 * Hook-friendly helper that combines `useResponsive` with `StyleSheet.create`.
 *
 * Usage:
 * ```ts
 * const styles = makeStyles(r => ({
 *   title: { fontSize: r.fontScale(24) },
 * }));
 * ```
 */
export function makeStyles<T extends StyleSheet.NamedStyles<T>>(
  creator: (r: ReturnType<typeof useResponsive>) => T
) {
  // This is a React hook – call inside a component body.
  const r = useResponsive();
  const rawStyles = creator(r);
  // `StyleSheet.create` guarantees style objects have correct types and defaults.
  return StyleSheet.create(rawStyles) as T;
}

export default makeStyles;
