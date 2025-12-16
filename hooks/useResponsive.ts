import { useWindowDimensions } from "react-native";

/**
 * Simple responsive utility hook.
 *
 * Returns high-level breakpoints as well as helpers for
 * percentage sizing (vw/vh) and font scaling.
 */
export function useResponsive() {
  const { width, height } = useWindowDimensions();

  // Breakpoints – tweak to match your design system
  const isTablet = width >= 768;
  const isPhone = width < 768;
  const isLandscape = width > height;

  /**
   * Percentage width relative to the viewport width.
   * @example vw(50) //=> half the screen width
   */
  const vw = (percentage: number) => (width * percentage) / 100;

  /**
   * Percentage height relative to the viewport height.
   */
  const vh = (percentage: number) => (height * percentage) / 100;

  /**
   * Scales font size based on a base design width (default 390 for iPhone 14).
   * Keeps a sensible minimum.
   */
  const fontScale = (baseSize: number, designWidth = 390) => {
    const scaled = (width / designWidth) * baseSize;
    return Math.round(Math.max(baseSize * 0.85, scaled));
  };

  /**
   * Scales spacing/layout values based on a base design width (default 390).
   * Mirrors `fontScale` behavior for consistency, with a light lower clamp.
   */
  const scale = (baseSize: number, designWidth = 390) => {
    const scaled = (width / designWidth) * baseSize;
    // Preserve sign while enforcing a minimum magnitude for tiny screens
    const sign = baseSize < 0 ? -1 : 1;
    const absScaled = Math.abs(scaled);
    const minAbs = Math.abs(baseSize) * 0.85;
    return Math.round(sign * Math.max(minAbs, absScaled));
  };

  return {
    width,
    height,
    isTablet,
    isPhone,
    isLandscape,
    vw,
    vh,
    scale,
    fontScale,
  } as const;
}

// Allow both `import useResponsive from ...` and `import { useResponsive } from ...` patterns.
export default useResponsive;
