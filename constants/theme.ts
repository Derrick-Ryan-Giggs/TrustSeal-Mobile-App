export const theme = {
  // Primary Colors - Trust & Security focused
  primary: '#0052CC', // Professional blue
  secondary: '#1FB382', // Fresh green for verified
  accent: '#FF6B35', // Warm orange for CTAs

  // Status Colors
  success: '#1FB382',
  warning: '#FFA500',
  error: '#E63946',
  info: '#0052CC',

  // Trust Score Colors
  trustHigh: '#1FB382', // Green (75-100)
  trustMedium: '#FFA500', // Yellow (50-74)
  trustLow: '#E63946', // Red (0-49)

  // Neutral Colors
  background: '#FFFFFF',
  surface: '#F5F6FA',
  border: '#E0E0E0',
  text: '#1A1A1A',
  textSecondary: '#666666',
  textTertiary: '#999999',
  white: '#FFFFFF',
  black: '#000000',

  // Dark mode
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    border: '#333333',
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textTertiary: '#808080',
  },

  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  // Typography
  typography: {
    h1: { size: 32, weight: '800' as const, lineHeight: 40 },
    h2: { size: 24, weight: '700' as const, lineHeight: 32 },
    h3: { size: 20, weight: '700' as const, lineHeight: 28 },
    subtitle: { size: 16, weight: '600' as const, lineHeight: 24 },
    body: { size: 14, weight: '400' as const, lineHeight: 21 },
    caption: { size: 12, weight: '400' as const, lineHeight: 18 },
    button: { size: 14, weight: '600' as const, lineHeight: 20 },
  },

  // Border Radius
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  // Shadows
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};

export type Theme = typeof theme;
