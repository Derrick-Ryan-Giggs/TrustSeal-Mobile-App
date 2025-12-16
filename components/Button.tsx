import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { theme } from '../constants/theme';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
}) => {
  const getButtonStyle = () => {
    const baseStyle = styles.button;
    const variantStyles = {
      primary: styles.primaryButton,
      secondary: styles.secondaryButton,
      outline: styles.outlineButton,
      ghost: styles.ghostButton,
    };

    const sizeStyles = {
      sm: styles.buttonSm,
      md: styles.buttonMd,
      lg: styles.buttonLg,
    };

    return [
      baseStyle,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && { width: '100%' },
      (disabled || loading) && styles.disabled,
    ];
  };

  const getTextStyle = () => {
    const baseStyle = styles.buttonText;
    const variantStyles = {
      primary: styles.primaryText,
      secondary: styles.secondaryText,
      outline: styles.outlineText,
      ghost: styles.ghostText,
    };

    const sizeStyles = {
      sm: styles.textSm,
      md: styles.textMd,
      lg: styles.textLg,
    };

    return [baseStyle, variantStyles[variant], sizeStyles[size]];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle() as any}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        {loading ? (
          <ActivityIndicator color={variant === 'primary' ? '#FFF' : theme.primary} size="small" />
        ) : (
          <Text style={getTextStyle()}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  buttonText: {
    fontWeight: '600',
  },
  // Sizes
  buttonSm: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  buttonMd: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  } as any,
  buttonLg: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  } as any,
  // Variants
  primaryButton: {
    backgroundColor: theme.primary,
  },
  primaryText: {
    color: theme.white,
    fontSize: theme.typography.button.size,
  },
  secondaryButton: {
    backgroundColor: theme.secondary,
  },
  secondaryText: {
    color: theme.white,
    fontSize: theme.typography.button.size,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.primary,
  },
  outlineText: {
    color: theme.primary,
    fontSize: theme.typography.button.size,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: theme.primary,
    fontSize: theme.typography.button.size,
  },
  textSm: {
    fontSize: 12,
  },
  textMd: {
    fontSize: 14,
  },
  textLg: {
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});
