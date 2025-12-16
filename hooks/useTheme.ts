import { useColorScheme } from './useColorScheme';
import Colors from '@/constants/colors';

export function useTheme() {
  const colorScheme = useColorScheme();
  return Colors[colorScheme] || Colors.light;
}

export default useTheme;